import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';

// Zod validation schema
const registrationSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be at most 20 characters'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format'),
    age: z.number().min(18, 'Must be at least 18 years old').max(100),
    gender: z.enum(['male', 'female', 'other'], {
      required_error: 'Please select a gender',
    }),
    country: z.string().min(1, 'Please select a country'),
    bio: z
      .string()
      .max(500, 'Bio must be at most 500 characters')
      .optional()
      .or(z.literal('')),
    newsletter: z.boolean().optional(),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

const STORAGE_KEY = 'registration_form_data';

// Fields that should not be stored in localStorage (sensitive data)
const SENSITIVE_FIELDS = ['password', 'confirmPassword'];

export default function Registration() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onBlur',
    defaultValues: {
      age: 18,
      newsletter: false,
      terms: false,
    },
  });

  // Watch all form values for localStorage caching
  const formValues = watch();

  // Load cached data from localStorage on mount
  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const parsedData = JSON.parse(cached);
        // Restore non-sensitive fields only
        Object.keys(parsedData).forEach((key) => {
          if (!SENSITIVE_FIELDS.includes(key)) {
            setValue(key as keyof RegistrationFormData, parsedData[key]);
          }
        });
      } catch (error) {
        console.error('Failed to load cached form data:', error);
      }
    }
  }, [setValue]);

  // Save non-sensitive data to localStorage when form values change
  useEffect(() => {
    const dataToCache: Record<string, unknown> = {};
    Object.keys(formValues).forEach((key) => {
      if (!SENSITIVE_FIELDS.includes(key)) {
        dataToCache[key] = formValues[key as keyof RegistrationFormData];
      }
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToCache));
  }, [formValues]);

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);

    // Simulate async request
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Form submitted successfully:', data);

    // Clear localStorage after successful submission
    localStorage.removeItem(STORAGE_KEY);

    setIsSubmitting(false);
    alert('Registration successful! Check console for submitted data.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg px-8 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Create Your Account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                {...register('username')}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.username ? 'true' : 'false'}
                aria-describedby={errors.username ? 'username-error' : undefined}
              />
              {errors.username && (
                <p id="username-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register('firstName')}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={errors.firstName ? 'true' : 'false'}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                />
                {errors.firstName && (
                  <p id="firstName-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName')}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={errors.lastName ? 'true' : 'false'}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                />
                {errors.lastName && (
                  <p id="lastName-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="+1 (555) 123-4567"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              />
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Age Range Slider */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age: <span className="font-semibold">{watch('age')}</span>{' '}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="age"
                type="range"
                min="18"
                max="100"
                {...register('age', { valueAsNumber: true })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-invalid={errors.age ? 'true' : 'false'}
                aria-describedby={errors.age ? 'age-error' : undefined}
              />
              {errors.age && (
                <p id="age-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Gender Radio Buttons */}
            <div>
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </legend>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="gender-male"
                      type="radio"
                      value="male"
                      {...register('gender')}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="gender-male" className="ml-2 block text-sm text-gray-700">
                      Male
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="gender-female"
                      type="radio"
                      value="female"
                      {...register('gender')}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="gender-female" className="ml-2 block text-sm text-gray-700">
                      Female
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="gender-other"
                      type="radio"
                      value="other"
                      {...register('gender')}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="gender-other" className="ml-2 block text-sm text-gray-700">
                      Other
                    </label>
                  </div>
                </div>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.gender.message}
                  </p>
                )}
              </fieldset>
            </div>

            {/* Country Select */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                {...register('country')}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.country ? 'true' : 'false'}
                aria-describedby={errors.country ? 'country-error' : undefined}
              >
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="de">Germany</option>
                <option value="fr">France</option>
                <option value="il">Israel</option>
                <option value="other">Other</option>
              </select>
              {errors.country && (
                <p id="country-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* Bio Textarea */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio (Optional)
              </label>
              <textarea
                id="bio"
                rows={4}
                {...register('bio')}
                placeholder="Tell us about yourself..."
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                  errors.bio ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.bio ? 'true' : 'false'}
                aria-describedby={errors.bio ? 'bio-error' : undefined}
              />
              {errors.bio && (
                <p id="bio-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.bio.message}
                </p>
              )}
            </div>

            {/* Newsletter Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newsletter"
                  type="checkbox"
                  {...register('newsletter')}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="newsletter" className="font-medium text-gray-700">
                  Subscribe to newsletter
                </label>
                <p className="text-gray-500">Get updates and special offers via email</p>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  {...register('terms')}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  aria-invalid={errors.terms ? 'true' : 'false'}
                  aria-describedby={errors.terms ? 'terms-error' : undefined}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I accept the terms and conditions <span className="text-red-500">*</span>
                </label>
                {errors.terms && (
                  <p id="terms-error" className="mt-1 text-red-600" role="alert">
                    {errors.terms.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
