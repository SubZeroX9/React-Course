import { create } from 'zustand';
export const useToastStore = create((set) => ({
    toasts: [],
    addToast: (message, type = 'info', duration = 5000) => {
        const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        const toast = { id, message, type, duration };
        set((state) => ({
            toasts: [...state.toasts, toast],
        }));
        if (duration > 0) {
            setTimeout(() => {
                set((state) => ({
                    toasts: state.toasts.filter((t) => t.id !== id),
                }));
            }, duration);
        }
    },
    removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
    })),
    clearToasts: () => set({ toasts: [] }),
}));
