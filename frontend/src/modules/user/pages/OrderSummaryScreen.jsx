import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Receipt, Star, RotateCcw, ChevronRight } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { Button } from '@/components/ui/button'

export default function OrderSummaryScreen() {
    const navigate = useNavigate()
    const { id } = useParams()

    return (
        <PageTransition>
            <div className="bg-[#f8fafd] min-h-screen pb-32">
                {/* Header */}
                <div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">Order Summary</h1>
                    </div>
                    <button className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full">Support</button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Status Card */}
                    <div className="bg-white rounded-[40px] p-8 text-center border border-slate-100 shadow-sm">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <Receipt size={32} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900">Order Completed</h2>
                        <p className="text-sm text-slate-400 font-medium mt-1">Delivered on Sunday, 12:45 PM</p>

                        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
                            <Button variant="outline" className="h-14 rounded-2xl border-slate-100 font-black text-xs uppercase tracking-widest gap-2">
                                <RotateCcw size={16} /> Reorder
                            </Button>
                            <Button className="h-14 rounded-2xl bg-slate-900 font-black text-xs uppercase tracking-widest gap-2">
                                <Star size={16} className="text-yellow-400 fill-yellow-400" /> Rate Now
                            </Button>
                        </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                                <MapPin size={22} />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Delivered to</h3>
                                <p className="text-sm font-black text-slate-900 leading-relaxed">Sweet Home, Kothrud, Pune - 411038</p>
                            </div>
                        </div>
                    </div>

                    {/* Bill Details */}
                    <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm space-y-4">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Bill Details</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                                <div>
                                    <p className="text-sm font-black text-slate-900">Shimla Apples</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">10 kg x ₹165.00</p>
                                </div>
                                <span className="text-sm font-black text-slate-900">₹1,650</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                                <div>
                                    <p className="text-sm font-black text-slate-900">Organic Spinach</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">5 kg x ₹85.00</p>
                                </div>
                                <span className="text-sm font-black text-slate-900">₹425</span>
                            </div>
                        </div>

                        <div className="pt-6 space-y-3">
                            <div className="flex justify-between text-xs font-bold text-slate-500">
                                <span>Subtotal</span>
                                <span>₹2,075</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-500">
                                <span>Delivery Fee</span>
                                <span className="text-primary font-black uppercase">Free</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-500 border-b border-slate-50 pb-4">
                                <span>GST (5%)</span>
                                <span>₹103.75</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-lg font-black text-slate-900 tracking-tight">Total Payable</span>
                                <span className="text-2xl font-black text-primary tracking-tighter">₹2,178.75</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
