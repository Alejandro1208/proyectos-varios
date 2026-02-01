import { Product, PromoCode } from './types';

export const products: Product[] = [
    {
        id: 1,
        name: 'Odyssey Candee (Special Edition)',
        brand: 'Armaf',
        price: 85000,
        category: 'hombre',
        image: 'images/products/perfume-1.jpeg',
        description: 'Perfume dulce, para mujer, mejor repercusion en invierno, duracion de 8 horas aprox',
        stock: 8,
        featured: true,
        sort_order: 1,
    },
    {
        id: 2,
        name: 'Club de Nuit Woman',
        brand: 'Armaf',
        price: 72000,
        category: 'hombre',
        image: 'images/products/perfume-2.jpeg',
        description: 'Perfume de mujer, citrico, mejor para el verano o primavera, duracion aproximada de 6 horas',
        stock: 0,
        featured: true,
        sort_order: 2,
    },
    {
        id: 3,
        name: 'Odyssey Mandarin Sky',
        brand: 'Armaf',
        price: 78000,
        category: 'mujer',
        image: 'images/products/perfume-3.jpeg',
        description: 'Perfume unisex, mas hombre que mujer, citrico dulce para invierno con una duracion de mas de 6 horas',
        stock: 3,
        featured: false,
        sort_order: 3,
    },
];

/*
export const luckyWheel = {
    settings: {
        spins_per_user: '2',
        duration_hours: '168',
        is_active: '1',
    },
    prizes: [
        {
            id: 1,
            name: '10% OFF',
            value: '10',
            chance: 10,
            background_color: '#FFC107',
            text_color: '#000000',
        },
        {
            id: 2,
            name: 'Envío gratis',
            value: 'free_shipping',
            chance: 5,
            background_color: '#4CAF50',
            text_color: '#FFFFFF',
        },
        {
            id: 3,
            name: '20% OFF',
            value: '20',
            chance: 5,
            background_color: '#F44336',
            text_color: '#FFFFFF',
        },
        {
            id: 4,
            name: '5% OFF',
            value: '5',
            chance: 20,
            background_color: '#2196F3',
            text_color: '#FFFFFF',
        },
        {
            id: 5,
            name: '30% OFF',
            value: '30',
            chance: 2,
            background_color: '#9C27B0',
            text_color: '#FFFFFF',
        },
        {
            id: 6,
            name: '15% OFF',
            value: '15',
            chance: 10,
            background_color: '#FF9800',
            text_color: '#000000',
        },
        {
            id: 7,
            name: '25% OFF',
            value: '25',
            chance: 3,
            background_color: '#E91E63',
            text_color: '#FFFFFF',
        },
        {
            id: 8,
            name: 'Sin premio',
            value: '0',
            chance: 45,
            background_color: '#9E9E9E',
            text_color: '#FFFFFF',
        },
    ],
};
*/

export const promoCode: PromoCode = {
    code: 'NACHO10',
    discount_percentage: 10,
    is_active: true
};
