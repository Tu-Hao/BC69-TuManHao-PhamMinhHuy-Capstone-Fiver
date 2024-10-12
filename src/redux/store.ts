import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Save the Redux state to localStorage
const saveToLocalStorage = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state.auth); // Only store auth slice
        localStorage.setItem('authState', serializedState);
    } catch (error) {
        console.error('Could not save state', error);
    }
};

// Load the Redux state from localStorage
const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('authState');
        if (serializedState === null) {
            return undefined; // Let Redux use the default initial state
        }
        return { auth: JSON.parse(serializedState) }; // Parse the saved state
    } catch (error) {
        console.error('Could not load state', error);
        return undefined;
    }
};

// Initialize store with the persisted auth state from localStorage
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState: loadFromLocalStorage(), // Load state from localStorage
});

// Subscribe to store changes to save the auth state to localStorage
store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
