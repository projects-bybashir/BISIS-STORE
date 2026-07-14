export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface OrderData {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  selectedPackage?: string;
  message?: string;
}

export interface ToastMessage {
  message: string;
  visible: boolean;
  type?: 'success' | 'error' | 'info' | 'warning';
}
