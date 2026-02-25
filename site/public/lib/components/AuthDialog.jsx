import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { authService } from '../authService.js';
import { motion, AnimatePresence } from 'framer-motion';

export function AuthDialog() {
    const [open, setOpen] = useState(false);
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleOpen = () => setOpen(true);
        window.addEventListener('open-auth-modal', handleOpen);
        return () => window.removeEventListener('open-auth-modal', handleOpen);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isSignUpMode) {
                const cred = await authService.signup(email, password);
                await authService.ensureUserDoc(cred.user);
            } else {
                await authService.login(email, password);
            }
            setOpen(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        if (window.location.hostname === '127.0.0.1') {
            window.location.hostname = 'localhost';
            return;
        }

        setLoading(true);
        setError('');
        try {
            const cred = await authService.loginWithGoogle();
            await authService.ensureUserDoc(cred.user);
            setOpen(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = (e) => {
        e.preventDefault();
        setIsSignUpMode(!isSignUpMode);
        setError('');
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <AnimatePresence>
                {open && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                            />
                        </Dialog.Overlay>
                        <Dialog.Content asChild>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-48%' }}
                                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                                exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-48%' }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg gap-4 border border-white/10 bg-[rgba(15,17,21,0.85)] backdrop-blur-md p-6 shadow-lg sm:rounded-[var(--radius-sm)] radix-content text-white"
                            >
                                <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4 border-b border-white/10 pb-4">
                                    <Dialog.Title className="font-orbitron text-xl font-bold uppercase tracking-wider m-0">
                                        {isSignUpMode ? 'Create Account' : 'Driver Access'}
                                    </Dialog.Title>
                                    <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-white/10 data-[state=open]:text-white">
                                        <X className="h-5 w-5" />
                                        <span className="sr-only">Close</span>
                                    </Dialog.Close>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {error && (
                                        <div className="bg-[var(--f1-red)]/20 border border-[var(--f1-red)]/50 text-white p-3 rounded text-sm text-center font-bold font-inter tracking-wide shadow-[0_0_15px_rgba(225,6,0,0.3)]">
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs uppercase tracking-wider text-white/50 font-bold mb-1">Email</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                                placeholder="name@f1insight.com"
                                                className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs uppercase tracking-wider text-white/50 font-bold mb-1">Password</label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                                placeholder="••••••••"
                                                className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-[var(--f1-red)] hover:bg-[#ff1a1a] text-white font-orbitron font-bold uppercase tracking-wider py-3 rounded text-sm transition-all shadow-[0_4px_15px_rgba(225,6,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loading ? 'Processing...' : (isSignUpMode ? 'Sign Up' : 'Sign In')}
                                            </button>
                                        </div>
                                    </form>

                                    <div className="relative my-2">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-white/10"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-[rgba(20,22,28,1)] px-2 text-white/50 font-bold tracking-wider">Or</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleGoogleAuth}
                                        disabled={loading}
                                        type="button"
                                        className="w-full bg-white text-black hover:bg-gray-100 font-inter font-bold py-2 rounded text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                                        Sign In with Google
                                    </button>
                                </div>

                                <div className="text-center mt-4 text-sm text-white/60">
                                    <p>
                                        {isSignUpMode ? 'Already have an account? ' : "Don't have an account? "}
                                        <a href="#" onClick={toggleMode} className="text-white hover:text-[var(--f1-red)] hover:underline font-bold transition-colors">
                                            {isSignUpMode ? 'Sign In' : 'Sign Up'}
                                        </a>
                                    </p>
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
}
