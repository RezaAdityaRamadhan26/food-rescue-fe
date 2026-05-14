"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Clock3,
  Leaf,
  MoreHorizontal,
  Package2,
  Pencil,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  X,
  Store,
  ShoppingBag,
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useAuthStore } from "@/store/AuthStore";

const fallbackFoods = [
  {
    id: "fallback-1",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    title: "Nasi Box Ayam",
    category: "Indonesian Food",
    originalPrice: 40000,
    rescuePrice: 15000,
    stock: 8,
    rescued: 12,
    total: 20,
    closing: "1h 20m",
    status: "Available",
  },
  {
    id: "fallback-2",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    title: "Fresh Bakery Bread",
    category: "Bakery",
    originalPrice: 28000,
    rescuePrice: 10000,
    stock: 3,
    rescued: 17,
    total: 20,
    closing: "45m",
    status: "Low Stock",
  },
  {
    id: "fallback-3",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    title: "Healthy Salad Bowl",
    category: "Healthy Food",
    originalPrice: 35000,
    rescuePrice: 14000,
    stock: 0,
    rescued: 20,
    total: 20,
    closing: "Closed",
    status: "Sold Out",
  },
];

export default function FoodManagementPage() {
  const { user } = useAuthStore();
  const [foods, setFoods] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState("REGULAR");
  const [flashSaleEndTime, setFlashSaleEndTime] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFoods = async () => {
    try {
      const [ownedRes, allRes] = await Promise.all([
        axiosInstance.get("/products/owned").catch(() => ({ data: [] })),
        axiosInstance.get("/products", { params: { limit: 100 } }).catch(() => ({ data: [] })),
      ]);

      const ownedData = ownedRes.data?.data?.products || ownedRes.data?.products || ownedRes.data?.data || ownedRes.data || [];
      const ownedArray = Array.isArray(ownedData) ? ownedData : [];

      const allData = allRes.data?.data?.products || allRes.data?.products || allRes.data?.data || allRes.data || [];
      const allArray = Array.isArray(allData) ? allData : [];

      // Extract known merchant identifiers from ownedArray and user profile
      const knownRestIds = new Set(ownedArray.map((p) => p.restaurantId).filter(Boolean));
      if (user?.id) knownRestIds.add(user.id);

      const knownRestNames = new Set(ownedArray.map((p) => p.restaurant?.name).filter(Boolean));
      if (user?.fullname) knownRestNames.add(user.fullname);

      const knownUserIds = new Set(ownedArray.map((p) => p.restaurant?.userId).filter(Boolean));
      if (user?.id) knownUserIds.add(user.id);

      // Find any additional products from allArray belonging to this merchant
      const matchingFromAll = allArray.filter((p) => {
        if (!p) return false;
        if (p.restaurantId && knownRestIds.has(p.restaurantId)) return true;
        if (p.restaurant?.id && knownRestIds.has(p.restaurant.id)) return true;
        if (p.restaurant?.name && knownRestNames.has(p.restaurant.name)) return true;
        if (p.restaurant?.userId && knownUserIds.has(p.restaurant.userId)) return true;
        return false;
      });

      // Merge and deduplicate by id
      const mergedMap = new Map();
      [...ownedArray, ...matchingFromAll].forEach((p) => {
        if (p && p.id) mergedMap.set(p.id, p);
      });

      setFoods(Array.from(mergedMap.values()));
    } catch {
      setFoods([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data.data || res.data || []);
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await Promise.all([fetchFoods(), fetchCategories()]);
      setIsLoading(false);
    };
    init();
  }, []);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleDelete = async (id: string) => {
    if (id.startsWith("fallback-")) {
      alert("Ini adalah data contoh dan tidak bisa dihapus dari database.");
      return;
    }
    if (!confirm("Apakah Anda yakin ingin menghapus makanan ini dari menu?")) return;

    try {
      await axiosInstance.delete(`/products/${id}`);
      alert("Makanan berhasil dihapus!");
      fetchFoods();
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menghapus makanan");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("originalPrice", originalPrice);
      formData.append("sellingPrice", sellingPrice);
      formData.append("stock", stock);
      formData.append("categoryId", categoryId);
      formData.append("type", type);

      if (type === "FLASH_SALE") {
        formData.append("flashSaleStartTime", new Date().toISOString());
        formData.append("flashSaleEndTime", new Date(flashSaleEndTime).toISOString());
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axiosInstance.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Makanan baru berhasil ditambahkan!");
      setIsModalOpen(false);

      // Reset form
      setName("");
      setDescription("");
      setOriginalPrice("");
      setSellingPrice("");
      setStock("");
      setCategoryId("");
      setType("REGULAR");
      setFlashSaleEndTime("");
      setImageFile(null);

      // Refresh list
      fetchFoods();
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal menambahkan makanan");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Compute stats dynamically from database
  const activeFoodsCount = foods.length;
  const rescuedCount = foods.reduce((acc, f) => acc + (f.rescued || 0), 0);

  const stats = [
    {
      title: "Active Foods",
      value: String(activeFoodsCount),
      desc: "Produk aktif di tokomu",
      color: "bg-[#AC7F5E]",
      text: "text-white",
      icon: ShoppingBag,
    },
    {
      title: "Total Rescued",
      value: String(rescuedCount),
      desc: "Total porsi yang diselamatkan",
      color: "bg-[#FDFAF6]",
      text: "text-[#091413]",
      icon: Package2,
    },
    {
      title: "Restoran Partner",
      value: "UMKM Aktif",
      desc: "Menyelamatkan limbah makanan",
      color: "bg-[#FDFAF6]",
      text: "text-[#091413]",
      icon: Store,
    },
    {
      title: "CO₂ Saved",
      value: `${rescuedCount * 1.5}kg`,
      desc: "Dampak lingkungan positif",
      color: "bg-[#FDFAF6]",
      text: "text-[#091413]",
      icon: Leaf,
    },
  ];

  const displayFoods = foods;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFCFB]">
        <div className="h-12 w-12 animate-spin rounded-full border-3 border-[#AC7F5E]/20 border-t-[#AC7F5E]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFCFB] p-6 pt-24 lg:px-16">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-serif text-5xl text-[#091413]">
            Food Management
          </h1>
          <p className="mt-2 text-sm text-[#091413]/65">
            Kelola makanan rescue dan stok harian UMKM kamu.
          </p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => {
              if (categories.length === 0) fetchCategories();
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-2xl bg-[#AC7F5E] px-5 py-3 text-sm font-semibold text-[#FFFCFB] transition hover:scale-[1.02]"
          >
            <Plus size={18} /> Add Food
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const StatIcon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`rounded-[28px] border border-[#EEE2D4] p-5 shadow-[0_4px_20px_rgba(45,31,20,0.04)] ${item.color}`}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className={`text-sm ${index === 0 ? "text-[#FFFCFB]" : "text-[#9E8A78]"}`}>
                    {item.title}
                  </p>
                  <h2 className={`mt-3 font-bold ${item.text} ${
                    item.value.length > 8 
                      ? "text-3xl" 
                      : item.value.length > 5 
                        ? "text-4xl" 
                        : "text-5xl"
                  }`}>
                    {item.value}
                  </h2>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    index === 0 ? "bg-[#FFFCFB]/10 text-[#FFFCFB]" : "bg-[#FFFCFB] text-[#091413]"
                  }`}
                >
                  <StatIcon size={20} className={index === 0 ? "text-[#FFFCFB]" : "text-[#AC7F5E]"} />
                </div>
              </div>
              <div className={`text-sm ${index === 0 ? "text-[#FFFCFB]/75" : "text-[#9E8A78]"}`}>
                {item.desc}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FOOD GRID / EMPTY STATE */}
      {displayFoods.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-[32px] border border-[#EEE2D4] bg-[#FDFAF6] p-12 text-center shadow-[0_4px_20px_rgba(45,31,20,0.02)]"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#F5EFE6] text-[#AC7F5E] mb-6">
            <Leaf size={36} className="animate-pulse" />
          </div>
          <h3 className="font-serif text-3xl font-semibold text-[#091413]">
            Belum Ada Produk Rescue
          </h3>
          <p className="mt-3 max-w-md text-sm text-[#091413]/65 leading-relaxed">
            Mulai kurangi food waste dan selamatkan pendapatan Anda dengan menambahkan produk makanan penyelamat pertama Anda sekarang!
          </p>
          <button
            onClick={() => {
              if (categories.length === 0) fetchCategories();
              setIsModalOpen(true);
            }}
            className="mt-8 flex items-center gap-2 rounded-2xl bg-[#AC7F5E] px-6 py-3.5 text-sm font-semibold text-[#FFFCFB] transition hover:scale-[1.02] hover:bg-[#8B6A4A]"
          >
            <Plus size={18} /> Tambah Makanan
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {displayFoods.map((food, index) => {
            const rescued = food.rescued || 0;
            const total = food.total || (food.stock + rescued) || 10;
            const progress = total > 0 ? (rescued / total) * 100 : 0;
            const isLowStock = food.stock > 0 && food.stock <= 3;
            const isSoldOut = food.stock === 0;

            const statusLabel = isSoldOut ? "Sold Out" : isLowStock ? "Low Stock" : "Available";

            return (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="group overflow-hidden rounded-[30px] border border-[#EEE2D4] bg-[#FDFAF6] shadow-[0_4px_20px_rgba(45,31,20,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,31,20,0.08)]"
              >
                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  {food.imageUrl ? (
                    <Image
                      src={food.imageUrl.startsWith("http") ? food.imageUrl : `https://food-rescue-be.vercel.app/${food.imageUrl}`}
                      alt={food.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#AC7F5E]/10 to-[#BBAB8C]/10">
                      <Leaf size={48} className="text-[#AC7F5E]/40" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#091413]/70 via-transparent to-transparent" />

                  <div className="absolute left-4 top-4">
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusLabel === "Available"
                          ? "bg-[#F5E6D3] text-[#AC7F5E]"
                          : statusLabel === "Low Stock"
                            ? "bg-[#FFE8CC] text-[#B7791F]"
                            : "bg-[#F8D7DA] text-[#C53030]"
                      }`}
                    >
                      {statusLabel}
                    </div>
                  </div>

                  {food.type === "FLASH_SALE" && (
                    <div className="absolute right-4 top-4">
                      <div className="rounded-full bg-[#E53E3E] px-3 py-1 text-xs font-bold text-white uppercase tracking-wider animate-pulse">
                        ⚡ Flash Sale
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 backdrop-blur-md">
                    <Clock3 size={14} className="text-white" />
                    <span className="text-xs font-medium text-white">
                      {food.type === "FLASH_SALE" ? "Flash Sale Active" : "Ready Today"}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-[#091413] line-clamp-1">
                        {food.name}
                      </h2>
                      <p className="mt-1 text-sm text-[#9E8A78]">
                        {food.category?.categoryName || "Uncategorized"}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5EFE6] text-[#AC7F5E]">
                        <Package2 size={18} />
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#9E8A78]">Stock Left</p>
                        <h3 className="text-lg font-bold text-[#091413]">
                          {food.stock}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="mb-5 rounded-2xl bg-[#F8F4EF] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#9E8A78]">Original Price</p>
                        <span className="text-sm text-[#B8A898] line-through">
                          Rp {food.originalPrice.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-[#9E8A78]">Rescue Price</p>
                        <span className="text-2xl font-bold text-[#091413]">
                          Rp {food.sellingPrice.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PROGRESS */}
                  <div className="mb-5">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-medium text-[#091413]">
                        Rescue Progress
                      </p>
                      <span className="text-sm text-[#7C5B3A]">
                        {rescued}/{total}
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-[#EEE2D4]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1 }}
                        className="h-full rounded-full bg-[#AC7F5E]"
                      />
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-3">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#AC7F5E] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button 
                      onClick={() => handleDelete(food.id)}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#EEE2D4] bg-white text-[#C53030] transition hover:bg-[#FBEBEB]"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ADD FOOD MODAL */}
      {isModalOpen && (
        <div 
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-xs overscroll-y-contain"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl rounded-[28px] border border-[#EEE2D4] bg-[#FFFCFB] p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between border-b border-[#EEE2D4] pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#091413]">Add Rescue Food</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition"
              >
                <X size={20} className="text-[#091413]/70" />
              </button>
            </div>

            <form 
              data-lenis-prevent
              onSubmit={handleSubmit} 
              className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 overscroll-y-contain"
            >
              {error && (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-[#091413] mb-1">Nama Makanan *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Nasi Box Ayam Bakar"
                  className="w-full rounded-xl border border-[#E7DAC8] bg-[#FFFCFB] px-4 py-3 outline-none transition focus:border-[#AC7F5E]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#091413] mb-1">Deskripsi Makanan</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Berikan info porsi, isi box, atau kondisi makanan rescue"
                  className="w-full rounded-xl border border-[#E7DAC8] bg-[#FFFCFB] px-4 py-3 outline-none transition focus:border-[#AC7F5E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#091413] mb-1">Kategori *</label>
                  <select
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded-xl border border-[#E7DAC8] bg-[#FFFCFB] px-4 py-3 outline-none transition focus:border-[#AC7F5E]"
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map((c: any) => (
                      <option key={c.id} value={c.id}>{c.categoryName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#091413] mb-1">Stok Porsi *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Contoh: 10"
                    className="w-full rounded-xl border border-[#E7DAC8] bg-[#FFFCFB] px-4 py-3 outline-none transition focus:border-[#AC7F5E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#091413] mb-1">Harga Asli (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="Contoh: 35000"
                    className="w-full rounded-xl border border-[#E7DAC8] bg-[#FFFCFB] px-4 py-3 outline-none transition focus:border-[#AC7F5E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#091413] mb-1">Harga Rescue (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    placeholder="Contoh: 15000"
                    className="w-full rounded-xl border border-[#E7DAC8] bg-[#FFFCFB] px-4 py-3 outline-none transition focus:border-[#AC7F5E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#091413] mb-1">Tipe Penjualan *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-xl border border-[#E7DAC8] bg-[#FFFCFB] px-4 py-3 outline-none transition focus:border-[#AC7F5E]"
                  >
                    <option value="REGULAR">Regular Rescue</option>
                    <option value="FLASH_SALE">Flash Sale (Terbatas)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#091413] mb-1">Foto Makanan</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full text-sm text-[#091413]/70 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#AC7F5E]/10 file:text-[#AC7F5E] hover:file:bg-[#AC7F5E]/20"
                  />
                </div>
              </div>

              {type === "FLASH_SALE" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-yellow-50/50 p-4 border border-yellow-100"
                >
                  <label className="block text-sm font-semibold text-[#091413] mb-1">Waktu Akhir Flash Sale *</label>
                  <input
                    type="datetime-local"
                    required
                    value={flashSaleEndTime}
                    onChange={(e) => setFlashSaleEndTime(e.target.value)}
                    className="w-full rounded-xl border border-[#E7DAC8] bg-[#FFFCFB] px-4 py-3 outline-none transition focus:border-[#AC7F5E]"
                  />
                  <p className="mt-1 text-xs text-amber-700">Waktu mundur flash sale akan langsung aktif setelah disimpan.</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-xl bg-[#AC7F5E] py-4 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Makanan"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
