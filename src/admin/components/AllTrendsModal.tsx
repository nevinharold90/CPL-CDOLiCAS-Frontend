import { useEffect, useRef, useState } from "react";
// Icons
import CloseIcon from "../assets/circle-xmark-1.png";
import CloseIconHover from "../assets/circle-xmark-2.png";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";


interface ChartDataItem {
  title: string;
  color: string;
  currentValue: number;
}

interface AllTrendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartData: ChartDataItem[];
}

const COLORS = {
  blue: "#3b82f6",
  emerald: "#10b981",
  violet: "#8b5cf6",
  amber: "#f59e0b",
  rose: "#ec4899",
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AllTrendsModal({
  isOpen,
  onClose,
  chartData,
}: AllTrendsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [periods, setPeriods] = useState<Record<string, 'day' | 'week' | 'month' | 'year'>>(
    () => chartData.reduce((acc, c) => ({ ...acc, [c.title]: 'week' }), {})
  );

  const getChartData = (item: ChartDataItem) => {
    const period = periods[item.title];
    let data: { label: string; value: number }[] = [];

    if (period === 'day') {
      data = Array.from({ length: 14 }, (_, i) => ({
        label: `Day ${i + 1}`,
        value: Math.round(item.currentValue * (0.6 + Math.random() * 0.8)),
      }));
    } else if (period === 'week') {
      data = Array.from({ length: 12 }, (_, i) => ({
        label: `Week ${i + 1}`,
        value: Math.round(item.currentValue * (0.7 + Math.random() * 0.6)),
      }));
    } else if (period === 'month') {
      data = months.map((m) => ({
        label: m,
        value: Math.round(item.currentValue * (0.65 + Math.random() * 0.7)),
      }));
    } else if (period === 'year') {
      data = Array.from({ length: 5 }, (_, i) => ({
        label: `${2021 + i}`,
        value: Math.round(item.currentValue * (0.5 + i * 0.15)),
      }));
    }

    return data;
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      modalRef.current?.focus();
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal content */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none font-[Poppins]">
               <motion.div
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.75, opacity: 0 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col overflow-hidden pointer-events-auto border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/80">
                <h2 className="text-xl font-semibold text-gray-900">All Trends</h2>
                <button
                  onClick={onClose}
                  className="rounded-full transition-colors group cursor-pointer"
                  aria-label="Close modal"
                >
                  {/* Normal state icon */}
                  <img
                    src={CloseIcon}
                    alt="Close"
                    className="w-5 h-5 group-hover:hidden"
                  />
                  
                  {/* Hover state icon */}
                  <img
                    src={CloseIconHover}           // ← your second icon here
                    alt="Close (hover)"
                    className="w-5 h-5 hidden group-hover:block"
                  />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8 space-y-12 bg-gray-50/40">
                {chartData.map((chart) => (
                  <div
                    key={chart.title}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{chart.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Latest: {chart.currentValue.toLocaleString()}
                        </p>
                      </div>

                      <select
                        value={periods[chart.title]}
                        onChange={(e) =>
                          setPeriods((prev) => ({ ...prev, [chart.title]: e.target.value as any }))
                        }
                        className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        <option value="day">Day</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                      </select>
                    </div>

                    <div className="p-6 h-[360px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={getChartData(chart)}
                          margin={{ top: 16, right: 32, left: 16, bottom: 40 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                          <XAxis
                            dataKey="label"
                            axisLine={{ stroke: "#d1d5db" }}
                            tickLine={{ stroke: "#d1d5db" }}
                            tick={{ fill: "#6b7280", fontSize: 13 }}
                            angle={-45}
                            textAnchor="end"
                            dy={10}
                            height={60}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={{ stroke: "#d1d5db" }}
                            tick={{ fill: "#6b7280", fontSize: 13 }}
                            tickFormatter={(val) => val.toLocaleString()}
                            width={60}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "white",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                              padding: "12px 16px",
                              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                            }}
                            labelStyle={{ fontWeight: 600, color: "#111827" }}
                            itemStyle={{ color: COLORS[chart.color as keyof typeof COLORS] }}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={COLORS[chart.color as keyof typeof COLORS]}
                            strokeWidth={2.5}
                            dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-right text-sm text-gray-500">
                Data is illustrative • Last updated: {new Date().toLocaleDateString()}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}