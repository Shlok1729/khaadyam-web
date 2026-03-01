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
        var snacks, _i, snacks_1, snack;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Start seeding Heritage Snacks... 🌿');
                    snacks = [
                        {
                            name: "Kai Muruku",
                            price: 145,
                            description: "Traditional hand-twisted crispy snacks made with premium rice flour and butter.",
                            weight: "250g",
                            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800",
                            badge: "BEST SELLER",
                            category: "Savoury Snacks",
                            isBestOfMonth: true,
                            isSoldOut: false
                        },
                        {
                            name: "Millet Mixture",
                            price: 180,
                            description: "A healthy, crunchy blend of foxtail millets, peanuts, and curry leaves.",
                            weight: "200g",
                            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800",
                            badge: null,
                            category: "Savoury Snacks",
                            isBestOfMonth: true,
                            isSoldOut: false
                        },
                        {
                            name: "Besan Laddu",
                            price: 220,
                            description: "Rich, melt-in-your-mouth sweet spheres made with pure desi ghee.",
                            weight: "250g",
                            image: "https://images.unsplash.com/photo-1589113103553-495816c09f1f?q=80&w=800",
                            badge: "NEW",
                            category: "Sweets",
                            isBestOfMonth: true,
                            isSoldOut: false
                        },
                        {
                            name: "Shenga Chutney",
                            price: 95,
                            description: "Stone-ground peanut chutney powder with dry red chilies and garlic.",
                            weight: "150g",
                            image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800",
                            badge: null,
                            category: "Masala Powders",
                            isBestOfMonth: true,
                            isSoldOut: true
                        },
                        {
                            name: "Special Malnad Nippattu",
                            price: 160,
                            description: "Spicy, deep-fried rice crackers, a signature staple of the Malnad region.",
                            weight: "250g",
                            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
                            badge: "HERITAGE",
                            category: "Savoury Snacks",
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Handmade Butter Chakli",
                            price: 145,
                            description: "Classic butter chakli crisps.",
                            weight: "200g",
                            image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=800",
                            badge: "BEST SELLER",
                            category: "Savoury Snacks",
                            isBestOfMonth: false,
                            isSoldOut: true
                        },
                        {
                            name: "Classic Kodubale",
                            price: 130,
                            description: "Ring-shaped spicy snacks infused with coconut and red chilies.",
                            weight: "180g",
                            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
                            badge: "BEST SELLER",
                            category: "Savoury Snacks",
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Spicy Banana Chips (Pepper)",
                            price: 120,
                            description: "Thinly sliced banana chips with a fiery hit of black pepper.",
                            weight: "200g",
                            image: "https://images.unsplash.com/photo-1613919113166-796c54d58232?q=80&w=800",
                            badge: "BEST SELLER",
                            category: "Savoury Snacks",
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Gulab Jamun Mix",
                            price: 110,
                            description: "Authentic instant mix for making soft and delicious gulab jamuns.",
                            weight: "150g",
                            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800",
                            badge: null,
                            category: "Instant Mix",
                            isBestOfMonth: false,
                            isSoldOut: false
                        },
                        {
                            name: "Mango Pickle",
                            price: 190,
                            description: "Traditional spicy mango pickle aged in cold-pressed oil.",
                            weight: "300g",
                            image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800",
                            badge: null,
                            category: "Pickles",
                            isBestOfMonth: false,
                            isSoldOut: false
                        }
                    ];
                    _i = 0, snacks_1 = snacks;
                    _a.label = 1;
                case 1:
                    if (!(_i < snacks_1.length)) return [3 /*break*/, 4];
                    snack = snacks_1[_i];
                    return [4 /*yield*/, exports.prisma.product.create({
                            data: snack,
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log('Seeding finished! Your Malnad pantry is full. ✨');
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
