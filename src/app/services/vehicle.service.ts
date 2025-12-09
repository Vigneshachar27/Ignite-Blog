import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { User } from '../models/user.model';
import { Tag } from '../models/tag.model';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private readonly demoUser: User = {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'ADMIN',
    status: 'ENABLED',
    createdAt: new Date().toISOString(),
  };

  private readonly tags: Tag[] = [
    { id: 1, name: 'Hyperbike', slug: 'hyperbike' },
    { id: 2, name: 'Superbike', slug: 'superbike' },
    { id: 3, name: 'Naked', slug: 'naked' },
    { id: 4, name: 'Sports Tourer', slug: 'sports-tourer' },
    { id: 5, name: 'Tourer', slug: 'tourer' },
    { id: 6, name: 'Hypercar', slug: 'hypercar' },
    { id: 7, name: 'Supercar', slug: 'supercar' },
    { id: 8, name: 'EV', slug: 'ev' },
    { id: 9, name: 'Hybrid', slug: 'hybrid' },
    { id: 10, name: 'GT', slug: 'gt' },
  ];

  private vehicles: Vehicle[] = [
    // 1–9: bikes
    {
      id: 1,
      title: 'Suzuki Hayabusa',
      slug: 'suzuki-hayabusa',
      excerpt: 'Legendary 1340cc hyperbike known for straight-line speed and comfort.',
      content:
        'The Suzuki Hayabusa is famous for its powerful 1340cc engine and long-distance comfort, making it a benchmark hyperbike in India. Approx. price: ₹18 Lakh+.',
      author: this.demoUser,
      tags: [this.tags[0]],
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://imgd.aeplcdn.com/1056x594/n/oyt76fb_1826575.webp?q=80',
    },
    {
      id: 2,
      title: 'Kawasaki Ninja ZX-10R',
      slug: 'kawasaki-ninja-zx-10r',
      excerpt: '998cc MotoGP-derived superbike focused on track performance.',
      content:
        'The Ninja ZX-10R brings MotoGP experience to the road with a 998cc engine, aggressive ergonomics, and advanced electronics. Approx. price: ₹20.79 Lakh+.',
      author: this.demoUser,
      tags: [this.tags[1]],
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://imgd.aeplcdn.com/664x374/n/shk9fhb_1869493.jpg?q=80',
    },
    {
      id: 3,
      title: 'Ducati Panigale V4',
      slug: 'ducati-panigale-v4',
      excerpt: 'Italian V4 superbike with premium electronics and track focus.',
      content:
        'The Panigale V4 uses a powerful V4 engine and top-tier electronics, aimed at riders who want cutting-edge superbike performance. Approx. price: ₹30–70 Lakh+.',
      author: this.demoUser,
      tags: [this.tags[1]],
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://www.mensjournal.com/.image/w_3840,q_auto:good,c_limit/MjA4NzA4ODA1NDEwNjk0NDUx/ducati-panigale-motorcycle.jpg?arena_f_auto',
    },
    {
      id: 4,
      title: 'BMW S 1000 RR',
      slug: 'bmw-s-1000-rr',
      excerpt: 'High-tech inline-four with strong power and balanced handling.',
      content:
        'The BMW S 1000 RR combines a powerful inline-four engine with advanced rider aids, making it a well-balanced superbike. Approx. price: ₹22.7 Lakh+.',
      author: this.demoUser,
      tags: [this.tags[1]],
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://havochobby.in/cdn/shop/files/61zXP2CqwHL._SL1000.jpg?v=1737958913',
    },
    {
      id: 5,
      title: 'Kawasaki Z900',
      slug: 'kawasaki-z900',
      excerpt: 'Middleweight naked bike with exciting performance and value.',
      content:
        'The Kawasaki Z900 is a popular middleweight naked motorcycle, offering strong performance and everyday usability. Approx. price: ₹10 Lakh+.',
      author: this.demoUser,
      tags: [this.tags[2]],
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHk63FLSqy_Q501Rjbzqax_8HMU1uLquwUgQ&s',
    },
    {
      id: 6,
      title: 'KTM 1390 Super Duke R',
      slug: 'ktm-1390-super-duke-r',
      excerpt: 'Aggressive naked nicknamed “The Beast” for its raw power.',
      content:
        'The KTM 1390 Super Duke R is an extreme performance naked bike with brutal acceleration and sharp handling. Approx. price: ₹23 Lakh+.',
      author: this.demoUser,
      tags: [this.tags[2]],
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://cdn-fastly.motorcycle.com/media/2023/11/05/11821924/media.jpg?size=1200x628',
    },
    {
      id: 7,
      title: 'Ducati Streetfighter V4',
      slug: 'ducati-streetfighter-v4',
      excerpt: 'Superbike performance without fairings, built for maximum fun.',
      content:
        'The Ducati Streetfighter V4 takes superbike technology and removes the fairings for a wild naked experience. Approx. price: ₹28.7 Lakh+.',
      author: this.demoUser,
      tags: [this.tags[2]],
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/125565/ducati-streetfighter-v4-right-side-view0.jpeg?isig=0&q=80',
    },
    {
      id: 8,
      title: 'Kawasaki Ninja H2 SX',
      slug: 'kawasaki-ninja-h2-sx',
      excerpt: 'Supercharged sports tourer with luxury and huge power.',
      content:
        'The Ninja H2 SX combines a supercharged engine with touring comfort and advanced safety tech. Approx. price: ₹35 Lakh+.',
      author: this.demoUser,
      tags: [this.tags[3]],
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://imgd.aeplcdn.com/476x268/n/cw/ec/155277/ninja-h2-sx-right-side-view-2.png?isig=0',
    },
    {
      id: 9,
      title: 'Honda Gold Wing Tour',
      slug: 'honda-gold-wing-tour',
      excerpt: 'Full-size luxury touring motorcycle with a smooth engine.',
      content:
        'The Honda Gold Wing Tour is known for long-distance comfort, advanced features, and a smooth engine. Approx. price: ₹43 Lakh+.',
      author: this.demoUser,
      tags: [this.tags[4]],
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://powersports.honda.com/motorcycle/touring/-/media/products/family/gold-wing-tour/panel-features/2025/desktop/2025_gold-wing-tour-50th-engine-1190x736.png',
    },

    // 10–19: cars
    {
      id: 10,
      title: 'Lamborghini Revuelto',
      slug: 'lamborghini-revuelto',
      excerpt: 'Hybrid V12 hypercar with 1000+ bhp and ~2.5s 0–100 km/h.',
      content:
        'The Lamborghini Revuelto is a plug-in hybrid V12 hypercar with more than 1000 bhp, around 2.5 seconds 0–100 km/h and a top speed above 350 km/h. It represents Lamborghini’s latest flagship with extreme performance and hybrid tech. Approx. price: ₹8.9 Cr+.',
      author: this.demoUser,
      tags: [this.tags[6], this.tags[9], this.tags[8]], // Supercar, GT, Hybrid
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://images.dealer.com/ddc/vehicles/2025/Lamborghini/Revuelto/Coupe/color/Bianco%20Siderale-BSID-249,250,245-640-en_US.jpg',
    },
    {
      id: 11,
      title: 'Lotus Eletre R',
      slug: 'lotus-eletre-r',
      excerpt: 'High-performance electric SUV with around 905 bhp.',
      content:
        'The Lotus Eletre R is a performance-focused electric SUV producing about 905 bhp. It can reach 0–100 km/h in roughly 3 seconds and has a top speed around 265 km/h, blending practicality with serious performance. Approx. price: ₹2.9 Cr+.',
      author: this.demoUser,
      tags: [this.tags[6], this.tags[7], this.tags[7], this.tags[8]], // Supercar/EV
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://www.electrifying.com/files/NZBSmQmd90wPm88O/Eletre-cutout.png',
    },
    {
      id: 12,
      title: 'Mercedes-AMG GT 63 S E Performance',
      slug: 'mercedes-amg-gt-63-s-e-performance',
      excerpt: 'Hybrid AMG GT four-door with around 843 bhp.',
      content:
        'The Mercedes-AMG GT 63 S E Performance is a powerful plug-in hybrid four-door coupe with about 843 bhp, 0–100 km/h in roughly 3 seconds and a top speed over 300 km/h. It combines luxury, space and extreme AMG performance. Approx. price: ₹3.3 Cr+.',
      author: this.demoUser,
      tags: [this.tags[7], this.tags[8], this.tags[9]], // Supercar, Hybrid, GT
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://vehicle-images.dealerinspire.com/stock-images/chrome/197df17a9f7999659ad6192a17fdb3f6.png',
    },
    {
      id: 13,
      title: 'Ferrari 296 GTB',
      slug: 'ferrari-296-gtb',
      excerpt: 'Hybrid V6 Ferrari with about 819 bhp and ~2.9s 0–100 km/h.',
      content:
        'The Ferrari 296 GTB uses a twin-turbo V6 with hybrid assistance to produce around 819 bhp, hitting 0–100 km/h in under 3 seconds and reaching about 330 km/h. It is a mid-engined supercar focused on agility and emotion. Approx. price: ₹5.4 Cr+.',
      author: this.demoUser,
      tags: [this.tags[7], this.tags[8]], // Supercar, Hybrid
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://imgd.aeplcdn.com/642x336/n/cw/ec/154779/296-gtb-exterior-right-front-three-quarter-24.png?isig=0&q=80',
    },
    {
      id: 14,
      title: 'McLaren 750S',
      slug: 'mclaren-750s',
      excerpt: 'Lightweight supercar with around 740 bhp and ~2.8s 0–100 km/h.',
      content:
        'The McLaren 750S is a lightweight evolution of the 720S, producing about 740 bhp. It accelerates to 100 km/h in around 2.8 seconds and reaches over 330 km/h, focusing on driver engagement and track ability. Approx. price: ₹5.9 Cr+.',
      author: this.demoUser,
      tags: [this.tags[7]], // Supercar
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://stimg.cardekho.com/images/car-images/large/Mclaren/750S/9929/1742813260778/Silica-White_a5a5a8.jpg?impolicy=resize&imwidth=420',
    },
    {
      id: 15,
      title: 'Ferrari F8 Tributo',
      slug: 'ferrari-f8-tributo',
      excerpt: 'Twin-turbo V8 Ferrari supercar with about 720 bhp.',
      content:
        'The Ferrari F8 Tributo is powered by a twin-turbo V8 producing about 720 bhp, doing 0–100 km/h in around 2.9 seconds and reaching roughly 340 km/h. It pays tribute to Ferrari’s award-winning V8 engines. Approx. price: ₹4.0 Cr+.',
      author: this.demoUser,
      tags: [this.tags[7]], // Supercar
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhzTwF6PqmzS6Jdhl2IJoXF8m-HaCPUnelRA&s',
    },
    {
      id: 16,
      title: 'McLaren Artura',
      slug: 'mclaren-artura',
      excerpt: 'Hybrid V6 McLaren with around 690 bhp.',
      content:
        'The McLaren Artura is a plug-in hybrid V6 supercar producing roughly 690 bhp, reaching 0–100 km/h in about 3 seconds and a top speed near 330 km/h. It focuses on lightness and efficient performance. Approx. price: ₹5.1 Cr+.',
      author: this.demoUser,
      tags: [this.tags[7], this.tags[8]], // Supercar, Hybrid
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://mclaren.scene7.com/is/image/mclaren/P16FluxG34thFront_2?wid=1276&hei=718',
    },
    {
      id: 17,
      title: 'Aston Martin DB12',
      slug: 'aston-martin-db12',
      excerpt: 'Luxury GT with about 680 bhp and a 325 km/h top speed.',
      content:
        'The Aston Martin DB12 is a modern grand tourer with around 680 bhp, a 0–100 km/h time of about 3.6 seconds and a top speed around 325 km/h. It blends long-distance comfort with serious performance. Approx. price: ₹3.9 Cr+.',
      author: this.demoUser,
      tags: [this.tags[7], this.tags[9]], // Supercar, GT
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/158905/db12-exterior-right-front-three-quarter-2.png?isig=0&q=80',
    },
    {
      id: 18,
      title: 'Maserati MC20',
      slug: 'maserati-mc20',
      excerpt: 'Carbon-tub supercar with about 630 bhp and ~325 km/h top speed.',
      content:
        'The Maserati MC20 is a mid-engined supercar with a lightweight carbon chassis and a twin-turbo V6 producing around 630 bhp. It reaches about 325 km/h and offers a distinct Italian character. Approx. price: ₹3.7 Cr+.',
      author: this.demoUser,
      tags: [this.tags[7]], // Supercar
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://imgd.aeplcdn.com/642x336/n/cw/ec/108971/mc20-exterior-right-front-three-quarter-3.png?isig=0&q=80',
    },
    {
      id: 19,
      title: 'Porsche 911 Turbo S',
      slug: 'porsche-911-turbo-s',
      excerpt: 'All-wheel-drive supercar with 650+ bhp and ~2.7s 0–100 km/h.',
      content:
        'The Porsche 911 Turbo S delivers more than 650 bhp, all-wheel-drive traction and a 0–100 km/h time of around 2.7 seconds, with a top speed above 330 km/h. It is known for everyday usability and brutal acceleration. Approx. price: ₹3.0 Cr+.',
      author: this.demoUser,
      tags: [this.tags[7]], // Supercar
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://www.gts-models.com/wp-content/uploads/2019/04/gt786-porsche-911-930-turbo-s-01.jpg',
    },
  ];

  getAll(): Vehicle[] {
    return this.vehicles;
  }
  // Create
  add(vehicle: Vehicle): void {
    this.vehicles.push(vehicle);
  }

  // Update
  update(vehicle: Vehicle): void {
    const index = this.vehicles.findIndex((v) => v.id === vehicle.id);
    if (index !== -1) {
      this.vehicles[index] = { ...vehicle };
    }
  }

  // Delete
  delete(id: number): void {
    this.vehicles = this.vehicles.filter((v) => v.id !== id);
  }

  getBySlug(slug: string): Vehicle | undefined {
    return this.vehicles.find((v) => v.slug === slug);
  }
}
