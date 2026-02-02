import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown
} from "lucide-react";



const StatsCard = ({ title, value, description, icon, trend }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
    <div className="flex items-center justify-between pb-1">
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      {icon && <div className="text-gray-500">{icon}</div>}
    </div>
    <div className="text-xl font-semibold text-gray-900">{value}</div>
    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
      {description && <span>{description}</span>}
      {trend && (
        <div
          className={`flex items-center space-x-1 ${
            trend.isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend.isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>{Math.abs(trend.value)}%</span>
        </div>
      )}
    </div>
  </div>
);

export default StatsCard