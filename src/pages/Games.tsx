import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import SoftwareCard, { SoftwareItem } from "@/components/SoftwareCard";
import SoftwareModal from "@/components/SoftwareModal";
import { ReviewItem } from "@/components/ReviewCard";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import InstallStep from "@/components/InstallStep";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConfig } from "@/contexts/ConfigContext";
import { gamesData } from "@/data/gamesData";

// Complete games list (all 90+ games)
const allGamesData = [...gamesData];

// Reviews data
const gamesReviews: ReviewItem[] = [
  {
    id: 1,
    name: "GameMaster_2025",
    rating: 5,
    comment: "Amazing collection of game cheats! The GTA V mod menu works perfectly and hasn't been detected. Very safe and reliable.",
    date: new Date('2025-08-10')
  },
  {
    id: 2, 
    name: "CheaterPro",
    rating: 5,
    comment: "KRNL executor is the best! Level 8 execution works flawlessly with all my favorite Roblox scripts. Highly recommended!",
    date: new Date('2025-08-08')
  },
  {
    id: 3,
    name: "HackLord99",
    rating: 4,
    comment: "CS2 skin changer is incredible! All the new skins and knives are available. Installation was super easy too.",
    date: new Date('2025-08-05')
  },
  {
    id: 4,
    name: "ModMenuKing",
    rating: 5,
    comment: "Forza Horizon 5 mod menu gave me unlimited money and all cars instantly. Works great in 2025!",
    date: new Date('2025-08-03')
  },
  {
    id: 5,
    name: "ScriptKiddie",
    rating: 5,
    comment: "The Minecraft hack client is amazing for PvP servers. X-ray and killaura work perfectly without getting banned.",
    date: new Date('2025-08-01')
  }
];

const Games = () => {
  const [selectedSoftware, setSelectedSoftware] = useState<SoftwareItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState<SoftwareItem[]>(allGamesData);
  const { t } = useLanguage();
  const { config } = useConfig();
  
  const handleSoftwareClick = (software: SoftwareItem) => {
    setSelectedSoftware(software);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSoftware(null);
  };
  
  useEffect(() => {
    const filtered = allGamesData.filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [searchTerm]);
  
  useEffect(() => {
    document.title = `Games Catalog - ${config.site_name}`;
  }, [config.site_name]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extralight mb-6 leading-tight">
              <span className="gradient-text">Game Cheats Catalog</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-light mb-8 max-w-2xl mx-auto">
              Browse our collection of premium <span className="text-blue-400">game cheats and mods</span> for 2025
            </p>
            
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search game cheats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Games Catalog Section */}
      <section id="games" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light mb-4 gradient-text">Game Cheats Catalog</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Discover the latest game cheats, mod menus, and hacks for your favorite games in 2025
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <SoftwareCard
                key={game.id}
                software={game}
                onClick={() => handleSoftwareClick(game)}
              />
            ))}
          </div>
          
          {filteredGames.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No games found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light mb-4 gradient-text">User Reviews</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              See what our users say about their experience with our game cheats
            </p>
          </div>
          
          <ReviewsCarousel reviews={gamesReviews} />
        </div>
      </section>

      {/* How to Install Section */}
      <section id="how-to-install" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light mb-4 gradient-text">How to Install</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Follow these simple steps to get started with your game cheats
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <InstallStep
              number={1}
              title="Download"
              description="Download your selected game cheat from our catalog."
            />
            <InstallStep
              number={2}
              title="Extract Files"
              description="Extract the archive using the provided password."
            />
            <InstallStep
              number={3}
              title="Install"
              description="Run the installer and follow the setup instructions."
            />
            <InstallStep
              number={4}
              title="Activate"
              description="Launch the game and activate the cheat features."
            />
          </div>
        </div>
      </section>

      <Footer />
      
      <SoftwareModal
        software={selectedSoftware}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Games;