import { supabase } from './supabaseClient.js'

/**
 * 👤 SIGN UP FUNCTION
 * Registers a new user with email, password, and their full name.
 * Automatically triggers the creation of a row in the public.profiles table.
 */
export async function signUpUser(email, password, fullName) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            // We pass full_name inside options.data so our SQL trigger can intercept it
            options: {
                data: {
                    full_name: fullName,
                }
            }
        })

        if (error) throw error
        return { success: true, user: data.user }
    } catch (error) {
        console.error('Sign up failed:', error.message)
        return { success: false, error: error.message }
    }
}

/**
 * 🔑 LOGIN FUNCTION
 * Authenticates an existing user and creates a secure session.
 */
export async function loginUser(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) throw error
        return { success: true, user: data.user, session: data.session }
    } catch (error) {
        console.error('Login failed:', error.message)
        return { success: false, error: error.message }
    }
}

/**
 * 🚪 LOGOUT FUNCTION
 * Destroys the current user session.
 */
export async function logoutUser() {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        return { success: true }
    } catch (error) {
        console.error('Logout failed:', error.message)
        return { success: false, error: error.message }
    }
}

/**
 * 🔄 SESSION LISTENER (STATE CHECK)
 * Listens for authentication changes (login, logout, token refresh).
 * Use this to dynamically change UI states (like showing/hiding buttons).
 * @param {Function} callback - A function that runs whenever the auth state changes
 */
export function listenToAuthState(callback) {
    supabase.auth.onAuthStateChange((event, session) => {
        // event can be: 'SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED', etc.
        callback(event, session)
    })
}