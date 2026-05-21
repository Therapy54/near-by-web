import { useState } from "react"

function AppShell({ route, setRoute, children }) {
  const items = [
    { key: "products", label: "Products" },
    { key: "services", label: "Services" },
    { key: "jobs", label: "Jobs" },
  ]

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900">
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          <div className="text-xl font-black tracking-tight">NEAR-BY</div>

          <div className="flex items-center gap-2 bg-zinc-100 rounded-2xl p-1">
            {items.map((item) => {
              const active = route === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setRoute(item.key)}
                  className={`h-10 px-5 rounded-xl text-sm font-medium transition-all ${active ? "bg-white shadow-sm text-black" : "text-zinc-500 hover:text-black"}`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          <button className="h-10 px-5 rounded-2xl bg-black text-white text-sm font-medium">
            Profile
          </button>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}

function ConditionBadge({ label }) {
  const map = {
    Excellent: "bg-green-100 text-green-700",
    Good: "bg-blue-100 text-blue-700",
    Fair: "bg-yellow-100 text-yellow-700",
    Poor: "bg-red-100 text-red-700",
    New: "bg-zinc-200 text-zinc-800",
    Used: "bg-zinc-100 text-zinc-600",
  }

  return (
    <span className={`px-2 py-1 rounded-xl text-xs font-medium ${map[label] || "bg-zinc-100"}`}>{label}</span>
  )
}

/* ================= PRODUCTS ================= */
function ProductsPage({ openProduct }) {
  const products = [
    {
      title: "iPhone 15 Pro Max",
      price: "₦2,300,000",
      condition: "Excellent",
      status: "New",
      location: "Abuja • 3km away",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "PlayStation 5 Console",
      price: "₦850,000",
      condition: "Good",
      status: "Used",
      location: "Lagos • 1.2km away",
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "MacBook Pro M3",
      price: "₦3,900,000",
      condition: "Good",
      status: "Used",
      location: "PH • 800m away",
      image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-6">
      <div className="space-y-3">
        {products.map((item, i) => (
          <button key={i} onClick={openProduct} className="w-full bg-white border rounded-2xl overflow-hidden text-left hover:shadow-sm">
            <div className="flex">
              <div className="w-[220px] h-[160px] shrink-0">
                <img src={item.image} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between">
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <div className="w-9 h-9 rounded-full bg-zinc-300" />
                  </div>

                  <div className="text-xl font-black mt-1">{item.price}</div>

                  <div className="flex gap-2 mt-2">
                    <ConditionBadge label={item.condition} />
                    <ConditionBadge label={item.status} />
                  </div>
                </div>

                <div className="text-sm text-zinc-500">📍 {item.location}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ================= SERVICES (UPGRADED) ================= */
function ServicesPage() {
  const services = [
    {
      name: "Sarah Johnson",
      skill: "Wedding Videographer",
      tags: ["Video Editing", "Drone", "Photography"],
      rating: "4.8",
      location: "Lagos • 2km",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Michael Chen",
      skill: "UI/UX Designer",
      tags: ["Figma", "Product Design", "Prototyping"],
      rating: "4.7",
      location: "Abuja • 5km",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 space-y-3">
      {services.map((s, i) => (
        <div key={i} className="bg-white border rounded-2xl p-5 flex gap-4">
          <img src={s.avatar} className="w-16 h-16 rounded-2xl object-cover" />

          <div className="flex-1">
            <div className="flex justify-between">
              <h2 className="font-black">{s.name}</h2>
              <span className="text-sm font-semibold">⭐ {s.rating}</span>
            </div>

            <div className="text-zinc-700 font-medium">{s.skill}</div>

            <div className="flex gap-2 mt-2 flex-wrap">
              {s.tags.map((t, idx) => (
                <span key={idx} className="text-xs bg-zinc-100 px-2 py-1 rounded-xl">{t}</span>
              ))}
            </div>

            <div className="text-sm text-zinc-500 mt-2">📍 {s.location}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ================= JOBS (UPGRADED) ================= */
function JobsPage() {
  const jobs = [
    {
      title: "Senior Frontend Engineer",
      company: "Nova Technologies",
      salary: "$90k - $120k",
      type: "Remote • Full-time",
      location: "Global",
      logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Product Designer",
      company: "FinCore",
      salary: "$70k - $100k",
      type: "Hybrid • Full-time",
      location: "London",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 space-y-3">
      {jobs.map((j, i) => (
        <div key={i} className="bg-white border rounded-2xl p-5 flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <img src={j.logo} className="w-12 h-12 rounded-xl object-cover" />

            <div>
              <h2 className="font-black">{j.title}</h2>
              <div className="text-zinc-600">
                {j.company} • {j.type}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="font-black">{j.salary}</div>
            <div className="text-sm text-zinc-500">{j.location}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ================= DETAILS ================= */
function ProductDetailsPage({ goBack }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <button onClick={goBack} className="mb-6 border px-4 py-2 rounded-xl">← Back</button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-zinc-100 rounded-2xl" />

        <div>
          <h1 className="text-4xl font-black">Product Details</h1>
          <p className="text-zinc-500 mt-2">Full listing view</p>
        </div>
      </div>
    </div>
  )
}

/* ================= APP ================= */
export default function App() {
  const [route, setRoute] = useState("products")
  const [open, setOpen] = useState(false)

  return (
    <AppShell route={route} setRoute={setRoute}>
      {route === "products" && !open && (
        <ProductsPage openProduct={() => setOpen(true)} />
      )}

      {route === "products" && open && (
        <ProductDetailsPage goBack={() => setOpen(false)} />
      )}

      {route === "services" && <ServicesPage />}
      {route === "jobs" && <JobsPage />}
    </AppShell>
  )
}
