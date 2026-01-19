import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Phone, MessageSquare, Package, Truck, CheckCircle2, Clock } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { Button } from '@/components/ui/button'

const steps = [
    { label: 'Order Confirmed', status: 'completed', time: '10:30 AM', icon: CheckCircle2 },
    { label: 'Out for Delivery', status: 'current', time: '11:15 AM', icon: Truck },
    { label: 'Delivered', status: 'pending', time: '--:--', icon: Package }
]

export default function OrderTrackingScreen() {
    const navigate = useNavigate()
    const { id } = useParams()

    return (
        <PageTransition>
            <div className="bg-slate-50 min-h-screen pb-32">
                {/* Header */}
                <div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 tracking-tight">Track Order</h1>
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest">{id}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Visual Tracking Map Placeholder */}
                    <div className="bg-slate-200 h-64 rounded-[40px] relative overflow-hidden shadow-inner flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/73.8567,18.5204,13/400x300?access_token=pk.eyJ1IjoibW9ja3VzaGVyIiwiYSI6ImNsM3U1ejEwdzAxb3MzY28xb3N4M3N4M3gifQ.mocktoken')] bg-cover opacity-60" />
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="relative z-10 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-green-200 border-4 border-white"
                        >
                            <Truck size={24} />
                        </motion.div>
                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Delivery" alt="driver" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Your Delivery Partner</p>
                                    <p className="text-sm font-black text-slate-900">Suresh G.</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-green-100"><Phone size={18} /></button>
                                <button className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg"><MessageSquare size={18} /></button>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                        <div className="space-y-8 relative">
                            <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-slate-100" />
                            {steps.map((step, i) => (
                                <div key={i} className="flex items-start gap-6 relative z-10">
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-4 border-white shadow-sm ${step.status === 'completed' ? 'bg-primary text-white' :
                                            step.status === 'current' ? 'bg-orange-500 text-white' :
                                                'bg-slate-50 text-slate-300'
                                        }`}>
                                        <step.icon size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <h3 className={`text-sm font-black ${step.status === 'pending' ? 'text-slate-300' : 'text-slate-900'}`}>{step.label}</h3>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">{step.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-400 font-medium mt-1">
                                            {step.status === 'completed' ? 'Package is verified and ready.' :
                                                step.status === 'current' ? 'Partner is picking up your harvest.' :
                                                    'Expecting arrival shortly.'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
