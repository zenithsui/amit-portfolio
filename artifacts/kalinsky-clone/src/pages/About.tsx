import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-[100dvh] w-full pt-32 pb-24 px-6 md:px-12 flex flex-col bg-[#121212]">
      {/* Fixed Info */}
      <div className="fixed top-6 left-6 md:left-12 text-[11px] uppercase tracking-wider text-[rgba(236,236,236,0.5)] z-30 pointer-events-none">
        max kalinsky
      </div>
      <div className="fixed bottom-6 left-6 md:left-12 text-[11px] uppercase tracking-wider text-[rgba(236,236,236,0.5)] z-30 leading-relaxed pointer-events-none">
        23 y.o.<br />based in Iceland
      </div>

      {/* Hero */}
      <div className="flex-1 flex items-end mb-40 mt-32 md:mt-0">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[60px] md:text-[100px] lg:text-[120px] leading-[0.9] tracking-tight"
        >
          glad <span className="italic">y</span>ou're here
        </motion.h1>
      </div>

      {/* Scrollable Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full md:max-w-2xl md:ml-auto flex flex-col gap-24 mt-12 md:mt-24"
      >
        <section>
          <p className="text-[11px] uppercase tracking-wider text-[rgba(236,236,236,0.4)] mb-4">shaped by</p>
          <p className="text-[18px] md:text-[22px]">gym, swimming and nature</p>
        </section>

        <section>
          <p className="text-[11px] uppercase tracking-wider text-[rgba(236,236,236,0.4)] mb-6">few things about</p>
          <div className="flex flex-col gap-6 text-[16px] md:text-[18px] leading-[1.6] text-[rgba(236,236,236,0.8)] font-light">
            <p>It started in 2021, when a friend told me about web design and I thought — why not. Started with Youtube tutorials like everyone does, then took actual courses. Turns out I wasn't bad at it, the feedback from mentors was good enough to make me think this could actually go somewhere.</p>
            <p>So I went somewhere. The first job found me right after the courses, then a few more, real projects, real clients. Good years honestly. Until burnout showed up uninvited and overstayed its welcome.</p>
            <p>Then I found Framer and things got interesting again, design, animations, code, hosting — all in one place, all by me. Took me a while to realize that's actually a rare thing to do. Now I'm turning it into content — design, useful stuff, and things that just look good, check out my instagram.</p>
          </div>
        </section>

        <section>
          <p className="text-[11px] uppercase tracking-wider text-[rgba(236,236,236,0.4)] mb-4">worked with [ 2023-2024 ]</p>
          <p className="text-[18px] md:text-[22px] leading-relaxed">
            Nasdaq Private Market, Coxit, YDF Design, FarmSoho, Corporate Energies, RE/MAX<br/>
            <span className="text-[rgba(236,236,236,0.4)]">and more…</span>
          </p>
        </section>

        <footer className="mt-12 pt-12 border-t border-[rgba(236,236,236,0.1)] flex flex-col md:flex-row justify-between gap-8 text-[11px] uppercase tracking-wider text-[rgba(236,236,236,0.5)]">
          <div>
            <p className="mb-4 text-[rgba(236,236,236,0.3)]">
              <span className="text-[#ececec]">kalins</span>.design
            </p>
            <p className="max-w-[220px] leading-relaxed">
              web design, interaction design, branding, development, mentoring
            </p>
          </div>
          <div className="flex flex-col justify-between items-start md:items-end">
            <p>portfolio vol 1.0   '26</p>
            <a href="#" className="hover:text-[#ececec] transition-colors mt-8 md:mt-0">Instagram</a>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
