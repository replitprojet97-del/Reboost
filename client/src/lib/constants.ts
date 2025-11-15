import { Users, TrendingUp, Award, Globe } from "lucide-react";

export const OFFICIAL_STATS = [
  { 
    icon: Users, 
    label: "Clients accompagnés", 
    value: "2,500+", 
    color: "from-blue-500 to-indigo-600",
    key: "clients"
  },
  { 
    icon: TrendingUp, 
    label: "Montants financés", 
    value: "€250M+", 
    color: "from-indigo-500 to-purple-600",
    key: "amount"
  },
  { 
    icon: Award, 
    label: "Taux de satisfaction", 
    value: "98%", 
    color: "from-purple-500 to-pink-600",
    key: "satisfaction"
  },
  { 
    icon: Globe, 
    label: "Pays couverts", 
    value: "12+", 
    color: "from-pink-500 to-rose-600",
    key: "countries"
  }
] as const;
