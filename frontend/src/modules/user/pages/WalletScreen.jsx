import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Wallet, History, ArrowUpRight, ArrowDownLeft, CheckCircle2, ChevronRight, CreditCard } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useWallet } from '../contexts/WalletContext'
import { cn } from '@/lib/utils'

export default function WalletScreen() {
    const navigate = useNavigate()
    const { balance, transactions, addMoney } = useWallet()
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [amountToAdd, setAmountToAdd] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const handleAddMoney = () => {
        if (!amountToAdd || isNaN(amountToAdd) || amountToAdd <= 0) return

        setIsProcessing(true)
        // Simulate Razorpay Delay
        setTimeout(() => {
            addMoney(Number(amountToAdd))
            setIsProcessing(false)
            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
                setIsAddModalOpen(false)
                setAmountToAdd('')
            }, 2000)
        }, 1500)
    }

    return (
        <PageTransition>
            <div className="bg-[#f8fafd] min-h-screen pb-32">
                {/* Header */}
                <div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center gap-4 sticky top-0 z-40 h-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-600 active:scale-[0.9] transition-all shadow-sm border border-slate-100"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">KK Wallet</h1>
                </div>

                <div className="p-6 space-y-8">
                    {/* Wallet Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-green-900/20"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl" />
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Available Balance</p>
                            <h2 className="text-5xl font-black tracking-tighter flex items-baseline gap-1">
                                <span className="text-2xl text-slate-400 font-bold">₹</span>
                                {balance.toLocaleString()}
                            </h2>
                            <div className="mt-10 flex gap-4">
                                <Button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="flex-1 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest gap-2 shadow-lg shadow-green-900/20"
                                >
                                    <Plus size={18} /> Add Money
                                </Button>
                                <Button variant="outline" className="w-14 h-14 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10">
                                    <History size={20} />
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Transaction History */}
                    <div>
                        <div className="flex items-center justify-between mb-6 px-2">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Recent Transactions</h3>
                            <button className="text-primary text-[10px] font-black uppercase">View All</button>
                        </div>
                        <div className="space-y-3">
                            {transactions.map((txn, idx) => (
                                <motion.div
                                    key={txn.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center",
                                            txn.type === 'Added' ? "bg-green-50 text-green-500" : "bg-orange-50 text-orange-500"
                                        )}>
                                            {txn.type === 'Added' ? <ArrowDownLeft size={22} /> : <ArrowUpRight size={22} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900">{txn.type === 'Added' ? 'Money Added' : 'Payment for Order'}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{txn.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={cn(
                                            "text-base font-black tracking-tight",
                                            txn.type === 'Added' ? "text-green-600" : "text-slate-900"
                                        )}>
                                            {txn.type === 'Added' ? '+' : '-'}₹{txn.amount}
                                        </p>
                                        <p className="text-[9px] text-slate-300 font-bold uppercase">{txn.status}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Add Money Modal (Simulated Razorpay) */}
                <AnimatePresence>
                    {isAddModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-10 bg-slate-900/60 backdrop-blur-sm">
                            <motion.div
                                initial={{ y: 200, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 200, opacity: 0 }}
                                className="bg-white w-full max-w-sm rounded-[48px] p-8 shadow-2xl relative"
                            >
                                {showSuccess ? (
                                    <div className="text-center py-10">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-green-100"
                                        >
                                            <CheckCircle2 size={40} />
                                        </motion.div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Money Added!</h2>
                                        <p className="text-sm text-slate-400 font-medium mt-2">₹{amountToAdd} added to your KK Wallet.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-center mb-8">
                                            <h2 className="text-xl font-black text-slate-900">Add Money</h2>
                                            <button onClick={() => setIsAddModalOpen(false)} className="text-slate-300">
                                                <ChevronRight className="rotate-90" />
                                            </button>
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-2">Enter Amount (₹)</p>
                                        <div className="relative mb-8">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-black text-slate-300">₹</span>
                                            <input
                                                autoFocus
                                                type="number"
                                                value={amountToAdd}
                                                onChange={(e) => setAmountToAdd(e.target.value)}
                                                className="w-full h-20 bg-slate-50 rounded-3xl border-none pl-12 pr-6 text-3xl font-black text-slate-900 outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-100 mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
                                                        <CreditCard size={20} />
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-700">Powered by Razorpay</span>
                                                </div>
                                                <BadgeCheck size={16} className="text-blue-500" />
                                            </div>
                                            <Button
                                                disabled={isProcessing || !amountToAdd}
                                                onClick={handleAddMoney}
                                                className="w-full h-18 rounded-3xl bg-primary hover:bg-primary/90 text-xl font-black shadow-lg shadow-green-100 disabled:opacity-50"
                                            >
                                                {isProcessing ? "Processing..." : `Pay ₹${amountToAdd || '0'}`}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </PageTransition>
    )
}

function BadgeCheck({ size, className }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
        </svg>
    )
}
