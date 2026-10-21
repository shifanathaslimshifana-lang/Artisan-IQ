import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileSpreadsheet,
  MessageSquare,
  CheckCircle2,
  Clock,
  User,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface EnquiryItem {
  id: string;
  artisanName: string;
  cluster: string;
  materialName: string;
  requestedQty: string;
  message: string;
  date: string;
  status: 'pending' | 'quoted' | 'dispatched';
}

const INITIAL_ENQUIRIES: EnquiryItem[] = [
  {
    id: 'enq-101',
    artisanName: 'Meenakshi Ammal',
    cluster: 'Vilachery Pottery Cluster, Madurai',
    materialName: 'Cauvery Riverbed Pure Red Silt Clay',
    requestedQty: '150 kg Dry Powder',
    message: 'Need 150 kg for urgent pre-Pongal handi batch. Can you provide 2-day delivery with shock-proof bagging?',
    date: '2026-10-17 10:30 AM',
    status: 'pending',
  },
  {
    id: 'enq-102',
    artisanName: 'Ramasamy Potter Guild',
    cluster: 'Kumbakonam Cooperative',
    materialName: 'Unrefined Pit Clay with Rice Husk Mix',
    requestedQty: '500 kg',
    message: 'Seeking bulk quote for community kiln firing scheduled for next weekend.',
    date: '2026-10-16 04:15 PM',
    status: 'quoted',
  },
  {
    id: 'enq-103',
    artisanName: 'Selvam Terracotta Toys',
    cluster: 'Manamadurai Cluster',
    materialName: 'Pure Red Ochre Powder',
    requestedQty: '25 kg',
    message: 'Confirming natural mineral content is free of artificial red oxide dyes.',
    date: '2026-10-15 02:00 PM',
    status: 'dispatched',
  },
];

export const IncomingEnquiries: React.FC = () => {
  const { showToast } = useApp();
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(INITIAL_ENQUIRIES);

  const handleUpdateStatus = (id: string, newStatus: EnquiryItem['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    showToast('success', 'Enquiry Status Updated', `Status changed to ${newStatus.toUpperCase()}`);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
          <FileSpreadsheet className="w-4 h-4 text-amber-700" /> Direct Artisan Requisitions
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          Incoming Artisan Raw Material Enquiries
        </h1>
        <p className="text-xs text-neutral-500">
          Respond directly to artisan cooperatives, confirm availability of GI-certified riverbed clay, and issue pro-forma delivery quotes.
        </p>
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {enquiries.map((enq) => (
          <div
            key={enq.id}
            className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-neutral-900">{enq.artisanName}</span>
                <span className="text-xs text-neutral-500 font-medium">({enq.cluster})</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                    enq.status === 'dispatched'
                      ? 'bg-emerald-100 text-emerald-800'
                      : enq.status === 'quoted'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {enq.status}
                </span>
                <span className="text-xs text-neutral-400 font-mono">{enq.date}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-neutral-600">
                Requested Item: <strong className="text-neutral-900">{enq.materialName}</strong> ({enq.requestedQty})
              </div>
              <p className="text-xs text-neutral-700 bg-neutral-50 p-3 rounded-xl border border-neutral-100 leading-relaxed font-medium">
                "{enq.message}"
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              {enq.status === 'pending' && (
                <button
                  onClick={() => handleUpdateStatus(enq.id, 'quoted')}
                  className="px-3.5 py-1.5 bg-indigo-900 hover:bg-indigo-950 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Send Pro-Forma Quote & Freight Est.</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {enq.status === 'quoted' && (
                <button
                  onClick={() => handleUpdateStatus(enq.id, 'dispatched')}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirm Dispatch & Invoice</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
