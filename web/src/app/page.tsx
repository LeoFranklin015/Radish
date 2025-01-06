"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layouts/MainLayout";
import { CustomConnectButton } from "@/components/ui/CustomConnectButton";

const features = [
  {
    title: "Prediction Markets",
    description: "Place bets on creator growth metrics and rivalry outcomes across major platforms",
    icon: "🎯",
  },
  {
    title: "Decentralized & Verifiable",
    description: "Built on NeoX Blockchain with zktls enabled proofs for secure data verification",
    icon: "⛓️",
  },
  {
    title: "Multi-Platform Support",
    description: "Support for YouTube, Twitter, TikTok, and Instagram metrics",
    icon: "🌐",
  },
  {
    title: "Community-Driven",
    description: "Actively participate in and benefit from creator growth dynamics",
    icon: "👥",
  },
];

const futureFeatures = [
  {
    title: "Platform Expansion",
    description: "Integration with emerging platforms like Instagram Threads, Twitch, and Patreon",
    icon: "🚀",
  },
  {
    title: "Creator Rewards",
    description: "Reward system where creators benefit from fan engagement",
    icon: "🏆",
  },
  {
    title: "Creator Partnerships",
    description: "Collaborations with influencers to drive platform adoption",
    icon: "🤝",
  },
  {
    title: "Oracle Integration",
    description: "Robust Neo-supported Data oracle systems for market resolution",
    icon: "🔮",
  },
];
const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};


export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black to-zinc-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-32 flex flex-col justify-center items-center text-center space-y-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.h1
              variants={item}
              className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neo-green to-blue-500"
            >
              Rad or Not?
            </motion.h1>
            <motion.p
              variants={item}
              className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto"
            >
              The first decentralized prediction market where fans bet on their favorite content creators&apos; milestones and rivalries
            </motion.p>
            <motion.div
              variants={item}
              className="flex gap-4 justify-center"
            >
              <Link href="/markets">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="text-lg px-8 bg-neo-green text-black hover:bg-neo-green/90">
                    Explore Markets
                  </Button>
                </motion.div>
              </Link>
              <CustomConnectButton dark />
            </motion.div>
          </motion.div>
          <motion.div
            variants={item}
            className="w-full max-w-4xl"
          >
            <div className="relative w-full h-64 bg-zinc-800 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">🎥</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/2"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-neo-green rounded-full flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <span className="text-white font-semibold">Creator A</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">Creator B</span>
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-zinc-600 leading-relaxed"
          >
            Creator rivalry has always entertained the masses - PewDiePie vs T-Series, KSI vs Logan Paul -
            With RADISH, all this hype and fandom can be monetized through prediction markets that resolve
            followers, subscribers & viewer counts. We&apos;re transforming the creator-fan relationship by
            gamifying engagement and enabling fans to monetize their passion.
          </motion.p>
        </div>
      </motion.section>

      {/* Current Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-black text-white rounded-3xl"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Why Trade on Radish?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="p-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-4xl mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Future Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-zinc-50 rounded-3xl"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Coming Soon
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {futureFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-4xl mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 text-center"
      >
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.h2
            variants={item}
            className="text-4xl font-bold"
          >
            Ready to Join the Future of Creator Markets?
          </motion.h2>
          <motion.p
            variants={item}
            className="text-xl text-zinc-600 max-w-2xl mx-auto"
          >
            Start trading on creator milestones and be part of the next evolution in social-fi
          </motion.p>
          <motion.div
            variants={item}
            className="flex gap-4 justify-center"
          >
            <Link href="/markets">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="default" className="text-lg px-8">
                  Start Trading
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </Layout>
  );
}
