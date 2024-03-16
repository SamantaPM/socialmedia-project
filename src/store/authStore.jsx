import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const store = (set) => ({
  userProfile: null,
  addUser: (user) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null })
});

const useAuthStore = create(
  persist(store,
    { name: 'auth' }
  )
);

export default useAuthStore;
