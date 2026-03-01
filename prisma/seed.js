"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var catalog, _i, catalog_1, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Clearing old data... 🧹');
                    return [4 /*yield*/, exports.prisma.product.deleteMany()];
                case 1:
                    _a.sent();
                    console.log('Start seeding Authentic Khaadyam Catalog... 🌿');
                    catalog = [
                        // --- CHUTNEY ---
                        {
                            name: "Lime Chutney",
                            price: 150,
                            weight: "200g",
                            description: "Zesty traditional lime chutney, perfectly balancing tang, spice, and sweetness. An excellent accompaniment for meals.",
                            image: "https://images.unsplash.com/photo-1589112260481-9b1d9bf5c1f0?q=80&w=800",
                            category: "Chutney",
                            badge: "NEW",
                            isBestOfMonth: true,
                            isSoldOut: false
                        },
                        {
                            name: "Red Chutney",
                            price: 160,
                            weight: "200g",
                            description: "Fiery and flavorful red chutney made from selected dry chilies and indigenous spices.",
                            image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800",
                            category: "Chutney",
                            badge: "BEST SELLER",
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Ginger Chutney",
                            price: 150,
                            weight: "200g",
                            description: "A robust and spicy ginger chutney. Known for its digestive benefits and sharp, comforting flavor.",
                            image: "https://images.unsplash.com/photo-1615486171448-4cbabdd9cbfc?q=80&w=800",
                            category: "Chutney",
                            badge: null,
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Karindi Chutney",
                            price: 80,
                            weight: "200g",
                            description: "Authentic Karindi chutney offering a unique regional taste profile.",
                            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800",
                            category: "Chutney",
                            badge: null,
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Masala Khara",
                            price: 90,
                            weight: "100g",
                            description: "A versatile spicy masala mix that elevates the flavor of any snack it touches.",
                            image: "https://plus.unsplash.com/premium_photo-1664300346394-bb9f1a029312?q=80&w=800",
                            category: "Chutney",
                            badge: null,
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Tamarind Chutney",
                            price: 140,
                            weight: "200g",
                            description: "Sweet and sour tamarind chutney, a staple dipping sauce for savory chaat.",
                            image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800",
                            category: "Chutney",
                            badge: null,
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Methi Chutney",
                            price: 130,
                            weight: "200g",
                            description: "A deeply aromatic fenugreek (methi) chutney with a rich, slightly bitter traditional flavor.",
                            image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800",
                            category: "Chutney",
                            badge: null,
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Garlic Chutney",
                            price: 50,
                            weight: "100g",
                            description: "Pungent and spicy dry garlic chutney powder. Adds a powerful kick to everyday meals.",
                            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800",
                            category: "Chutney",
                            badge: "BEST SELLER",
                            isBestOfMonth: true,
                            isSoldOut: false
                        },
                        // --- CHATNIPUDI ---
                        {
                            name: "Groundnut Chatnipudi",
                            price: 50,
                            weight: "100g",
                            description: "Classic stone-ground peanut chutney powder with dry red chilies. Highly addictive.",
                            image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800",
                            category: "Chatnipudi",
                            badge: "HERITAGE",
                            isBestOfMonth: true,
                            isSoldOut: false
                        },
                        {
                            name: "Bengal Gram Chatnipudi",
                            price: 60,
                            weight: "100g",
                            description: "Roasted lentil (chana dal) powder infused with coastal spices.",
                            image: "https://plus.unsplash.com/premium_photo-1664300346394-bb9f1a029312?q=80&w=800",
                            category: "Chatnipudi",
                            badge: null,
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Niger Seede Chatnipudi",
                            price: 60,
                            weight: "100g",
                            description: "Unique and highly nutritious Niger seed (Huchellu) chutney powder.",
                            image: "https://plus.unsplash.com/premium_photo-1664300346394-bb9f1a029312?q=80&w=800",
                            category: "Chatnipudi",
                            badge: "HEALTH",
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Flax Seeds Chatnipudi",
                            price: 60,
                            weight: "100g",
                            description: "Omega-3 rich roasted flax seed powder. A superfood addition to your plate.",
                            image: "https://plus.unsplash.com/premium_photo-1664300346394-bb9f1a029312?q=80&w=800",
                            category: "Chatnipudi",
                            badge: "HEALTH",
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        // --- POWDER ---
                        {
                            name: "Red Chilli Powder",
                            price: 50,
                            weight: "100g",
                            description: "Pure, vibrant, and fiery red chili powder sourced from the finest farms.",
                            image: "https://plus.unsplash.com/premium_photo-1664300346394-bb9f1a029312?q=80&w=800",
                            category: "Powder",
                            badge: null,
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Rasam Powder",
                            price: 90,
                            weight: "100g",
                            description: "Our signature blend of warm spices for making the perfect aromatic South Indian Rasam.",
                            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800",
                            category: "Powder",
                            badge: "BEST SELLER",
                            isBestOfMonth: true,
                            isSoldOut: false
                        },
                        {
                            name: "Sambar Powder",
                            price: 100,
                            weight: "100g",
                            description: "Traditional Udupi-style sambar powder roasted to perfection.",
                            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800",
                            category: "Powder",
                            badge: null,
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        // --- RICE MIXTURES ---
                        {
                            name: "Puliguare Mixture",
                            price: 180,
                            weight: "200g",
                            description: "Authentic Puliyogare (Tamarind Rice) gojju base. Tangy, spicy, and deeply flavorful.",
                            image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=800",
                            category: "Rice Mixtures",
                            badge: "BEST SELLER",
                            isBestOfMonth: true,
                            isSoldOut: false
                        },
                        {
                            name: "Bise Bele Bath Mixture",
                            price: 90,
                            weight: "100g",
                            description: "The classic Karnataka Bisi Bele Bath spice blend. Creates a rich, aromatic lentil and rice dish.",
                            image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=800",
                            category: "Rice Mixtures",
                            badge: null,
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Vangi Bath Mixture",
                            price: 90,
                            weight: "100g",
                            description: "Traditional spice powder for authentic Eggplant (Vangi) Rice.",
                            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800",
                            category: "Rice Mixtures",
                            badge: null,
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        // --- NUTRITION SUPPLEMENTS ---
                        {
                            name: "Badam Powder",
                            price: 90,
                            weight: "100g",
                            description: "Rich and wholesome crushed almond powder. Perfect for blending into milk.",
                            image: "https://images.unsplash.com/photo-1589113103553-495816c09f1f?q=80&w=800",
                            category: "Nutrition Supliments",
                            badge: "HEALTH",
                            isBestOfMonth: true,
                            isSoldOut: false
                        },
                        {
                            name: "Ragi Malt",
                            price: 60,
                            weight: "100g",
                            description: "An ancient grain powerhouse. Nutrient-dense finger millet powder for a healthy morning porridge.",
                            image: "https://plus.unsplash.com/premium_photo-1664300346394-bb9f1a029312?q=80&w=800",
                            category: "Nutrition Supliments",
                            badge: "HEALTH",
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Multigrain Malt",
                            price: 60,
                            weight: "100g",
                            description: "A balanced nutritional supplement combining multiple healthy grains and pulses.",
                            image: "https://plus.unsplash.com/premium_photo-1664300346394-bb9f1a029312?q=80&w=800",
                            category: "Nutrition Supliments",
                            badge: "HEALTH",
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        // --- PAPAD ---
                        {
                            name: "Rice Papad",
                            price: 50,
                            weight: "100g",
                            description: "Crispy, light, and airy sun-dried rice crackers. Melts in the mouth.",
                            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
                            category: "Papad",
                            badge: null,
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Urad Dal Papad",
                            price: 65,
                            weight: "100g",
                            description: "Classic spiced lentil papad with a delightful peppery kick.",
                            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
                            category: "Papad",
                            badge: "BEST SELLER",
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Green Gram Papad",
                            price: 65,
                            weight: "100g",
                            description: "Healthy and crunchy papad made from nutritious moong dal.",
                            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
                            category: "Papad",
                            badge: "HEALTH",
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Multigrain Papad",
                            price: 65,
                            weight: "100g",
                            description: "A hearty mix of grains crafted into a highly textured, spiced papad.",
                            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
                            category: "Papad",
                            badge: null,
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Sandige / Wafers",
                            price: 60,
                            weight: "100g",
                            description: "Traditional handmade sun-dried wafers. Expands beautifully into a light crunch when fried.",
                            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800",
                            category: "Papad",
                            badge: "HERITAGE",
                            isBestOfMonth: true,
                            isSoldOut: true
                        },
                        // --- PICKLE ---
                        {
                            name: "Lime Pickle",
                            price: 120,
                            weight: "200g",
                            description: "Classic lip-smacking lime pickle aged in cold-pressed oil with fiery spices.",
                            image: "https://images.unsplash.com/photo-1589112260481-9b1d9bf5c1f0?q=80&w=800",
                            category: "Pickle",
                            badge: "BEST SELLER",
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Mango Pickle",
                            price: 120,
                            weight: "200g",
                            description: "Spicy and tangy traditional raw mango pickle. The ultimate comfort food pairing.",
                            image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800",
                            category: "Pickle",
                            badge: "BEST SELLER",
                            isBestOfMonth: true,
                            isSoldOut: false
                        },
                        // --- SNACKS ---
                        {
                            name: "Chakkuli",
                            price: 55,
                            weight: "100g",
                            description: "Crispy, circular, deeply traditional savory snacks made of rice flour and roasted urad dal.",
                            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800",
                            category: "Snacks",
                            badge: "BEST SELLER",
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Nipattu",
                            price: 55,
                            weight: "100g",
                            description: "Flat, crispy rice crackers seasoned with peanuts, sesame seeds, and a spicy chili kick.",
                            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
                            category: "Snacks",
                            badge: "HERITAGE",
                            isBestOfMonth: true,
                            isSoldOut: false
                        },
                        {
                            name: "Kodbale",
                            price: 55,
                            weight: "100g",
                            description: "A beloved Karnataka snack. Crunchy, spicy rings infused with coconut and curry leaves.",
                            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800",
                            category: "Snacks",
                            badge: "BEST SELLER",
                            isBestOfMonth: true,
                            isSoldOut: false
                        },
                        {
                            name: "Palak strips",
                            price: 55,
                            weight: "100g",
                            description: "Savory ribbon strips packed with the iron-rich goodness of fresh spinach (palak).",
                            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800",
                            category: "Snacks",
                            badge: null,
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Karad kaddi",
                            price: 55,
                            weight: "100g",
                            description: "Crispy, lightly spiced, traditional deep-fried savory sticks. The perfect tea-time companion.",
                            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800",
                            category: "Snacks",
                            badge: null,
                            isBestOfMonth: false,
                            isSoldOut: false
                        }
                    ];
                    _i = 0, catalog_1 = catalog;
                    _a.label = 2;
                case 2:
                    if (!(_i < catalog_1.length)) return [3 /*break*/, 5];
                    item = catalog_1[_i];
                    return [4 /*yield*/, exports.prisma.product.create({
                            data: item,
                        })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log('Seeding finished! Your Khaadyam product catalog is live. ✨');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, exports.prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
