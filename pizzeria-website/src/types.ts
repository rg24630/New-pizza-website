export type PizzaSize = 'Personal' | 'Medium' | 'Large';

export type CrustOption = 'Classic Hand-Tossed' | 'Thin \'N Crispy' | 'Original Stuffed Crust';

export type ToppingCategory = 'bases' | 'cheeses' | 'proteins' | 'greens' | 'finishes';

export interface ToppingOption {
  id: string;
  name: string;
  category: ToppingCategory;
  price: number;
  color: string; // Tailwinds colors or spec
  icon?: string;
  emoji?: string;
}

export interface PizzaPreset {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  toppings: string[]; // references of ToppingOption.id
  image: string;
  spicyLevel?: number;
  isVegetarian?: boolean;
}

export interface CustomPizzaConfig {
  size: PizzaSize;
  crust: CrustOption;
  sauce: 'Classic Marinara' | 'Creamy Garlic Parmesan' | 'Delectable Basil Pesto';
  toppings: string[]; // ids of active toppings
}

export interface CartItem {
  id: string;
  presetId?: string; // empty if 100% custom
  customName?: string; // name if client labeled it
  config: CustomPizzaConfig;
  quantity: number;
  pricePerUnit: number;
}

export type OrderStatus = 'received' | 'kneading' | 'baking' | 'delivering' | 'enjoy';

export interface Order {
  id: string;
  customerName: string;
  address: string;
  phone: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  timestamp: string;
  estimatedRemainingMinutes: number;
}

// DevOps pipeline simulator structures
export type PipelineStepStatus = 'pending' | 'running' | 'success' | 'failed';

export interface PipelineStep {
  id: string;
  name: string;
  taskName: string;
  status: PipelineStepStatus;
  durationMs: number;
  logLines: string[];
}

export interface PipelineSimState {
  status: 'idle' | 'running' | 'success' | 'failed';
  currentStepId?: string;
  steps: PipelineStep[];
}
