"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useReducedMotion,
} from "motion/react";

const easeOut = [0.215, 0.61, 0.355, 1];
const easeMove = [0.645, 0.045, 0.355, 1];
const viewportOnce = { once: true, amount: 0.4, margin: "0px 0px -10% 0px" };
const shell =
  "mx-auto w-[min(1180px,calc(100%_-_48px))] max-sm:w-[calc(100%_-_36px)]";
const monoLabel =
  "font-['DM_Mono',monospace] text-[10px] leading-[1.3] tracking-[0.12em] uppercase text-[var(--muted)]";

function Mark() {
  return (
    <span
      className="flex h-[17px] items-center gap-0.5 [&>i]:inline-block [&>i]:h-[75%] [&>i]:w-[3px] [&>i]:rounded-[3px] [&>i]:bg-current [&>i:nth-child(2)]:h-[55%] [&>i:nth-child(2)]:opacity-55 [&>i:nth-child(3)]:h-[35%] [&>i:nth-child(3)]:opacity-35"
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
    </span>
  );
}

function Brand() {
  return (
    <span className="inline-flex items-center gap-2 text-base font-medium tracking-[-0.035em]">
      <Mark />
      <span>Silo</span>
    </span>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M2 9h13M10.5 4.5 15 9l-4.5 4.5" />
    </svg>
  );
}

function CopyGlyph({ complete }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      {complete ? (
        <path d="m3.5 10 4 4 9-9" />
      ) : (
        <>
          <rect x="7" y="7" width="9" height="9" rx="1.5" />
          <path d="M13 7V4H4v9h3" />
        </>
      )}
    </svg>
  );
}

function Reveal({ children, className = "", delay = 0, y = 18 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.55, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [docked, setDocked] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const update = () => setDocked(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-2.5">
      <motion.header
        className="pointer-events-auto mx-auto flex min-h-[50px] w-full max-w-2xl items-center justify-between border border-black/[0.06] bg-[#fbfbf8]/75 px-2 backdrop-blur-[18px] backdrop-saturate-[140%] [will-change:transform,border-radius] max-sm:min-h-14 max-sm:px-[10px] pl-4 max-sm:pl-2"
        data-docked={docked}
        initial={false}
        animate={{
          y: docked ? 0 : 10,
          borderRadius: docked ? "0 0 20px 20px" : "40px",
          backgroundColor: docked
            ? "rgba(251, 251, 248, 0.86)"
            : "rgba(251, 251, 248, 0.72)",
        }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: "spring", duration: 0.42, bounce: 0 }
        }
      >
        <a
          className="inline-flex w-max items-center gap-2 text-base font-medium tracking-[-0.035em]"
          href="#top"
          aria-label="Silo home"
        >
          <Mark />
          <span>Silo</span>
        </a>
        <nav
          className="flex items-center gap-3 max-sm:gap-1.5"
          aria-label="Project links"
        >
          <a
            className="group relative grid size-[19px] place-items-center max-sm:size-[18px]"
            href="https://github.com/Vic-Orlands/Silo"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg
              className="size-full transition-opacity duration-150 ease-out group-hover:opacity-0"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <path
                className="fill-[#5e5e5e]"
                d="M206.13,75.92A57.79,57.79,0,0,0,201.2,29a6,6,0,0,0-5.2-3,57.77,57.77,0,0,0-47,24H123A57.77,57.77,0,0,0,76,26a6,6,0,0,0-5.2,3,57.79,57.79,0,0,0-4.93,46.92A55.88,55.88,0,0,0,58,104v8a54.06,54.06,0,0,0,50.45,53.87A37.85,37.85,0,0,0,98,192v10H72a26,26,0,0,1-26-26A38,38,0,0,0,8,138a6,6,0,0,0,0,12,26,26,0,0,1,26,26,38,38,0,0,0,38,38H98v18a6,6,0,0,0,12,0V192a26,26,0,0,1,52,0v40a6,6,0,0,0,12,0V192a37.85,37.85,0,0,0-10.45-26.13A54.06,54.06,0,0,0,214,112v-8A55.88,55.88,0,0,0,206.13,75.92ZM202,112a42,42,0,0,1-42,42H112a42,42,0,0,1-42-42v-8a43.86,43.86,0,0,1,7.3-23.69,6,6,0,0,0,.81-5.76,45.85,45.85,0,0,1,1.43-36.42,45.85,45.85,0,0,1,35.23,21.1A6,6,0,0,0,119.83,62h32.34a6,6,0,0,0,5.06-2.76,45.83,45.83,0,0,1,35.23-21.11,45.85,45.85,0,0,1,1.43,36.42,6,6,0,0,0,.79,5.74A43.78,43.78,0,0,1,202,104Z"
              />
            </svg>
            <svg
              className="absolute inset-0 size-full opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <path
                fill="#5e5e5e"
                d="M216,104v8a56.06,56.06,0,0,1-48.44,55.47A39.8,39.8,0,0,1,176,192v40a8,8,0,0,1-8,8H104a8,8,0,0,1-8-8V216H72a40,40,0,0,1-40-40A24,24,0,0,0,8,152a8,8,0,0,1,0-16,40,40,0,0,1,40,40,24,24,0,0,0,24,24H96v-8a39.8,39.8,0,0,1,8.44-24.53A56.06,56.06,0,0,1,56,112v-8a58.14,58.14,0,0,1,7.69-28.32A59.78,59.78,0,0,1,69.07,28,8,8,0,0,1,76,24a59.75,59.75,0,0,1,48,24h24a59.75,59.75,0,0,1,48-24,8,8,0,0,1,6.93,4,59.74,59.74,0,0,1,5.37,47.68A58,58,0,0,1,216,104Z"
              />
            </svg>
          </a>
          <a
            className="group relative grid size-[19px] place-items-center max-sm:size-[18px]"
            href="#workspace"
            aria-label="Browser extension"
          >
            <svg
              className="size-full transition-opacity duration-150 ease-out group-hover:opacity-0"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <path
                className="fill-[#5e5e5e]"
                d="M219.21,160.24a6,6,0,0,0-5.78-.35,22,22,0,1,1-11.05-41.83,22.15,22.15,0,0,1,11.05,2.06A6,6,0,0,0,222,114.7V72a14,14,0,0,0-14-14H169.48a35,35,0,0,0,.52-6,34.1,34.1,0,0,0-10.73-24.78,33.64,33.64,0,0,0-25.45-9.15A34,34,0,0,0,102.54,58H64A14,14,0,0,0,50,72v34.53a34,34,0,0,0-30.79,10.2,34,34,0,0,0,22.31,57.18,34.34,34.34,0,0,0,8.48-.44V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V165.31A6,6,0,0,0,219.21,160.24ZM210,208a2,2,0,0,1-2,2H64a2,2,0,0,1-2-2V165.31a6,6,0,0,0-6-6,5.92,5.92,0,0,0-2.57.58,22,22,0,0,1-31.38-18.46,22,22,0,0,1,31.38-21.31A6,6,0,0,0,62,114.7V72a2,2,0,0,1,2-2h46.69a6,6,0,0,0,5.42-8.57,22.25,22.25,0,0,1-2-11,22,22,0,1,1,41.83,11A6,6,0,0,0,161.3,70H208a2,2,0,0,1,2,2v34.54a34,34,0,0,0-39.93,31.28,33.71,33.71,0,0,0,9.14,25.45A34.15,34.15,0,0,0,210,173.48Z"
              />
            </svg>
            <svg
              className="absolute inset-0 size-full opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <path
                fill="#5e5e5e"
                d="M165.78,224H208a16,16,0,0,0,16-16V170.35A8,8,0,0,0,212.94,163a23.37,23.37,0,0,1-8.94,1.77c-13.23,0-24-11.1-24-24.73s10.77-24.73,24-24.73a23.37,23.37,0,0,1,8.94,1.77A8,8,0,0,0,224,109.65V72a16,16,0,0,0-16-16H171.78a35.36,35.36,0,0,0,.22-4,36,36,0,0,0-72,0,35.36,35.36,0,0,0,.22,4H64A16,16,0,0,0,48,72v32.22a35.36,35.36,0,0,0-4-.22,36,36,0,0,0,0,72,35.36,35.36,0,0,0,4-.22V208a16,16,0,0,0,16,16h42.22a35.36,35.36,0,0,0-.22,4,36,36,0,0,0,72,0A35.36,35.36,0,0,0,165.78,224Z"
              />
            </svg>
          </a>
          <motion.a
            className="ml-[5px] inline-flex min-h-9 items-center gap-[7px] rounded-full bg-[var(--orange)] px-4 font-['DM_Mono',monospace] text-[9px] font-medium tracking-[0.05em] text-white uppercase transition-colors duration-150 hover:bg-[#ec4e0a] max-sm:ml-[3px] max-sm:min-h-8 max-sm:px-3 max-sm:text-[8px] [&>svg]:size-3.5 [&>svg]:fill-current"
            href="https://github.com/Vic-Orlands/Silo"
            target="_blank"
            rel="noreferrer"
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.12 }}
          >
            <svg viewBox="0 0 256 256" aria-hidden="true">
              <path d="M222,144v64a6,6,0,0,1-6,6H40a6,6,0,0,1-6-6V144a6,6,0,0,1,12,0v58H210V144a6,6,0,0,1,12,0Zm-98.24,4.24a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0-8.48-8.48L134,129.51V32a6,6,0,0,0-12,0v97.51L92.24,99.76a6,6,0,0,0-8.48,8.48Z" />
            </svg>
            Install
          </motion.a>
        </nav>
      </motion.header>
    </div>
  );
}

function ApertureLayered() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="relative z-0 w-[min(100%,440px)] justify-self-end select-none max-[900px]:justify-self-center max-sm:w-[calc(100%_-_16px)]"
      initial={reduce ? false : { opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, delay: 0.12, ease: easeOut }}
    >
      <div
        className="pointer-events-none rounded-[7px] p-3.5 border border-dashed border-[var(--line)] font-['DM_Mono',monospace] text-[7px] font-light tracking-[0.09em] text-[var(--muted)] opacity-60"
        aria-hidden="true"
      >
        <motion.figure
          className="relative z-[1] m-0 aspect-square overflow-hidden rounded-[7px] border border-[var(--line)] bg-[var(--soft)] shadow-[0_8px_24px_rgba(32,35,31,0.06)] [&>img]:size-full [&>img]:object-cover [&>img]:opacity-90"
          whileHover={reduce ? undefined : { scale: 1.025 }}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <img
            src="/silo-aperture-square.png"
            alt="Looking upward through the circular opening inside a concrete silo"
          />
          <div
            className="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(0deg,rgba(25,27,24,0.025)_0_1px,transparent_1px_12px)]"
            aria-hidden="true"
          />
        </motion.figure>
      </div>
    </motion.div>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      className="min-h-[70svh] overflow-hidden bg-[var(--sheet)] pt-[78px]"
      id="top"
    >
      <div className={`${shell} max-w-[1080px]`}>
        <Header />
      </div>
      <div
        className={`${shell} relative grid min-h-[calc(70svh_-_78px)] max-w-[1080px] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-[clamp(36px,6vw,92px)] py-[42px] pb-14 max-[900px]:grid-cols-1 max-[900px]:gap-[88px] max-[900px]:py-[74px] max-[900px]:pb-[120px] max-sm:min-h-0 max-sm:gap-[82px] max-sm:px-[5px] max-sm:py-[62px] max-sm:pb-[105px]`}
      >
        <div className="flex flex-col justify-center max-[900px]:w-[min(100%,560px)]">
          <motion.h1
            className="m-0 max-w-[620px] text-[clamp(74px,8vw,116px)] font-medium leading-[0.88] tracking-[-0.075em] text-balance max-sm:text-[clamp(61px,18vw,82px)]"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
          >
            Silo
          </motion.h1>
          <motion.p
            className="mt-5 text-[clamp(26px,2.4vw,34px)] font-normal tracking-[-0.04em] max-sm:text-[26px]"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.18, ease: easeOut }}
          >
            Your vault stays local.
          </motion.p>
          <motion.p
            className="mt-[23px] text-pretty text-base font-light leading-[1.7] text-[var(--muted)]"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.24, ease: easeOut }}
          >
            Encrypted on your machine. Unlocked for one session. The browser
            only gets what you approve. Silo keeps credentials on your machine
            and makes every release of a secret an explicit action.
          </motion.p>
          <motion.div
            className="mt-[30px] flex flex-wrap items-center gap-2.5"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.3, ease: easeOut }}
          >
            <motion.a
              className="inline-flex min-h-11 items-center gap-3 rounded-full bg-[var(--orange)] px-[22px] text-xs font-medium text-white transition-colors duration-150 hover:bg-[#ec4e0a] [&>svg]:w-4 [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:stroke-[1.5]"
              href="https://github.com/Vic-Orlands/Silo"
              target="_blank"
              rel="noreferrer"
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              Install Silo <Arrow />
            </motion.a>
            <a
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] bg-[rgba(251,251,248,0.5)] px-[22px] text-xs transition-colors duration-150 hover:border-black/30 hover:bg-[var(--sheet)]"
              href="#system"
            >
              How it is built
            </a>
          </motion.div>
          <motion.ul
            className="mt-8 flex list-none flex-wrap gap-x-[22px] gap-y-2.5 p-0 font-['DM_Mono',monospace] text-[11px] font-light text-[var(--muted)] uppercase [&>li]:inline-flex [&>li]:items-center [&>li]:gap-2 [&>li]:before:size-1 [&>li]:before:rounded-full [&>li]:before:bg-[var(--orange)] [&>li]:before:content-['']"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.36, ease: easeOut }}
          >
            <li>Local-first</li>
            <li>Encrypted data</li>
            <li>Explicit actions</li>
          </motion.ul>
        </div>
        <ApertureLayered />
      </div>
    </section>
  );
}

function SessionClockHands({ live }) {
  const primaryRef = useRef(null);
  const echoRef = useRef(null);

  useEffect(() => {
    const setAngle = (node, angle) => {
      if (node) node.setAttribute("transform", `rotate(${angle} 110 70)`);
    };

    if (!live) {
      setAngle(primaryRef.current, 0);
      setAngle(echoRef.current, 0);
      return;
    }

    let cancelled = false;
    let remaining = 2;
    let sweep = null;
    let bounce = null;

    const play = () => {
      if (cancelled || remaining <= 0) return;
      remaining -= 1;

      sweep?.stop();
      bounce?.stop();
      setAngle(primaryRef.current, 0);
      setAngle(echoRef.current, 0);

      sweep = animate(0, 360, {
        duration: 1.35,
        ease: easeOut,
        onUpdate: (angle) => setAngle(primaryRef.current, angle),
        onComplete: play,
      });
      bounce = animate(0, 360, {
        type: "spring",
        stiffness: 46,
        damping: 12,
        mass: 0.9,
        onUpdate: (angle) => setAngle(echoRef.current, angle),
      });
    };

    play();

    return () => {
      cancelled = true;
      sweep?.stop();
      bounce?.stop();
    };
  }, [live]);

  return (
    <>
      <g ref={echoRef} opacity="0.4">
        <line
          x1="110"
          y1="70"
          x2="132"
          y2="48"
          stroke="#ff5500"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <g ref={primaryRef}>
        <line
          x1="110"
          y1="70"
          x2="132"
          y2="48"
          stroke="#ff5500"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </>
  );
}

function TruthVisual({ type, active = false }) {
  const id = useId().replaceAll(":", "");
  const reduce = useReducedMotion();
  const live = active && !reduce;

  if (type === "file") {
    const denseId = `${id}-dense-vertical`;
    const orangeId = `${id}-orange-hatch`;
    return (
      <svg viewBox="0 0 220 140" aria-hidden="true">
        <defs>
          <pattern
            id={denseId}
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="4"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.3"
            />
          </pattern>
          <pattern
            id={orangeId}
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="4"
              y2="4"
              stroke="#ff5500"
              strokeWidth="1"
              opacity="0.75"
            />
          </pattern>
        </defs>
        <g>
          <path
            d="M75 25h50l15 15v75H75Z"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M125 25v15h15"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M80 45h40v45H80Z"
            fill={`url(#${denseId})`}
            stroke="currentColor"
            strokeOpacity="0.15"
            strokeWidth="1"
          />
        </g>
        <motion.circle
          cx="100"
          cy="68"
          r="16"
          fill="none"
          stroke="#ff5500"
          strokeWidth="1"
          style={{ transformOrigin: "100px 68px" }}
          animate={
            live
              ? { scale: [1, 1.12, 1], opacity: [1, 0.7, 1] }
              : { scale: 1, opacity: 1 }
          }
          transition={
            live
              ? {
                  duration: 2.2,
                  ease: easeOut,
                  times: [0, 0.45, 1],
                  repeat: 1,
                }
              : { duration: 0.6 }
          }
        />
        <motion.circle
          cx="100"
          cy="68"
          r="10"
          fill={`url(#${orangeId})`}
          stroke="#ff5500"
          strokeWidth="0.5"
          style={{ transformOrigin: "100px 68px" }}
          animate={live ? { rotate: 180 } : { rotate: 0 }}
          transition={{
            duration: 1.8,
            ease: easeOut,
            repeat: live ? 1 : 0,
          }}
        />
        <motion.line
          x1="140"
          y1="68"
          x2="165"
          y2="68"
          stroke="#ff5500"
          strokeWidth="1"
          strokeDasharray="2 2"
          animate={
            live
              ? { strokeDashoffset: [0, -16], opacity: [0.45, 1] }
              : { strokeDashoffset: 0, opacity: 1 }
          }
          transition={
            live
              ? { duration: 1.7, ease: "linear", repeat: 1 }
              : { duration: 0.5 }
          }
        />
        <motion.circle
          cx="165"
          cy="68"
          r="2.5"
          fill="#ff5500"
          animate={
            live ? { scale: [1, 1.55, 1], x: [0, 3, 0] } : { scale: 1, x: 0 }
          }
          transition={
            live
              ? { duration: 1.8, ease: easeOut, delay: 0.3, repeat: 1 }
              : { duration: 0.5 }
          }
        />
      </svg>
    );
  }

  if (type === "session") {
    const slantedId = `${id}-slanted-dense`;
    return (
      <svg viewBox="0 0 220 140" aria-hidden="true">
        <defs>
          <pattern
            id={slantedId}
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="4"
              x2="4"
              y2="0"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.3"
            />
          </pattern>
        </defs>
        {Array.from({ length: 36 }).flatMap((_, groupIndex) => {
          const groupSpan = 10;
          const base = groupIndex * groupSpan;
          const ticks = [
            { angle: base, size: "long" },
            { angle: base + groupSpan * 0.38, size: "short" },
            { angle: base + groupSpan * 0.62, size: "short" },
          ];
          return ticks.map((tick, tickIndex) => {
            const angle = (tick.angle * Math.PI) / 180;
            const highlighted = tick.angle >= 30 && tick.angle <= 140;
            const innerRadius = tick.size === "long" ? 40 : 42;
            const outerRadius = tick.size === "long" ? 48 : 46;
            const point = (radius, axis) =>
              (axis === "x"
                ? 110 + radius * Math.cos(angle)
                : 70 + radius * Math.sin(angle)
              ).toFixed(6);
            return (
              <line
                key={`${groupIndex}-${tickIndex}`}
                x1={point(innerRadius, "x")}
                y1={point(innerRadius, "y")}
                x2={point(outerRadius, "x")}
                y2={point(outerRadius, "y")}
                stroke={highlighted ? "#ff5500" : "currentColor"}
                strokeOpacity={highlighted ? 1 : 0.4}
                strokeWidth={highlighted ? 1 : 0.5}
              />
            );
          });
        })}
        <circle
          cx="110"
          cy="70"
          r="28"
          fill={`url(#${slantedId})`}
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        <SessionClockHands live={live} />
        <circle cx="110" cy="70" r="4" fill="#ff5500" />
      </svg>
    );
  }

  const denseId = `${id}-dense-bridge`;
  const orangeId = `${id}-orange-bridge`;
  return (
    <svg viewBox="0 0 220 140" aria-hidden="true">
      <defs>
        <pattern
          id={denseId}
          width="3"
          height="3"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="3"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.3"
          />
        </pattern>
        <pattern
          id={orangeId}
          width="3"
          height="3"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="3"
            stroke="#ff5500"
            strokeWidth="0.8"
            opacity="0.8"
          />
        </pattern>
      </defs>
      <motion.g
        style={{ transformOrigin: "70px 70px" }}
        animate={live ? { rotate: 360 } : { rotate: 0 }}
        transition={
          live
            ? { duration: 1.4, ease: easeOut, repeat: 1 }
            : { duration: 0.5, ease: easeOut }
        }
      >
        <circle
          cx="70"
          cy="70"
          r="28"
          stroke="currentColor"
          strokeWidth="1"
          fill={`url(#${denseId})`}
        />
        <circle
          cx="70"
          cy="70"
          r="14"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          strokeDasharray="2 2"
        />
        <circle cx="70" cy="70" r="4.5" fill="#ff5500" />
      </motion.g>
      <motion.g
        style={{ transformOrigin: "150px 70px" }}
        animate={live ? { rotate: -360 } : { rotate: 0 }}
        transition={
          live
            ? { duration: 1.4, ease: easeOut, repeat: 1 }
            : { duration: 0.5, ease: easeOut }
        }
      >
        <circle
          cx="150"
          cy="70"
          r="28"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
        />
      </motion.g>
      <motion.path
        d="M98 64h24v12H98Z"
        fill={`url(#${orangeId})`}
        stroke="#ff5500"
        strokeWidth="1"
        animate={live ? { scaleX: [1, 1.08, 1] } : { scaleX: 1 }}
        style={{ transformOrigin: "110px 70px" }}
        transition={
          live
            ? { duration: 0.9, ease: easeOut, delay: 0.1, repeat: 1 }
            : { duration: 0.25 }
        }
      />
      <line
        x1="74.5"
        y1="70"
        x2="145"
        y2="70"
        stroke="#ff5500"
        strokeWidth="1"
        strokeDasharray="1 1"
      />
      <polygon points="144,67 150,70 144,73" fill="#ff5500" />
    </svg>
  );
}

const studies = [
  {
    id: "A",
    type: "file",
    title: "The file is the place",
    body: "A vault you can locate, move, back up, and inspect.",
  },
  {
    id: "B",
    type: "session",
    title: "The session has a lifetime",
    body: "Unlock for the work in front of you. Inactivity closes it.",
  },
  {
    id: "C",
    type: "bridge",
    title: "The browser asks",
    body: "One approved field crosses the gate. The vault does not.",
  },
];

const entries = [
  { name: "github", user: "octocat", url: "github.com", totp: "284 519" },
  {
    name: "linear",
    user: "work@example.com",
    url: "linear.app",
    totp: "035 882",
  },
  {
    name: "proton",
    user: "private@example.com",
    url: "proton.me",
    totp: "711 204",
  },
];

function StudyCard({ study }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="grid min-w-0 grid-rows-[minmax(260px,1fr)_auto] max-sm:grid-rows-[auto_auto]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setHovered(false);
        }
      }}
    >
      <div className="relative grid min-h-[260px] place-items-center overflow-hidden border-b border-[var(--line)] bg-[rgba(233,236,233,0.48)] after:absolute after:-bottom-[60px] after:-right-[35px] after:h-60 after:w-[150px] after:rotate-[18deg] after:bg-[repeating-linear-gradient(90deg,var(--ink)_0_1px,transparent_1px_5px)] after:opacity-[0.06] after:content-[''] max-sm:min-h-[180px]">
        <div className="relative z-[1] w-[min(78%,280px)] text-[var(--ink)]">
          <TruthVisual type={study.type} active={hovered} />
        </div>
      </div>
      <div className="grid min-h-[190px] grid-cols-[24px_1fr] content-start gap-x-3.5 px-7 pb-6 pt-[30px] max-sm:min-h-[145px] max-sm:px-5 max-sm:pb-6">
        <span className="row-span-2 font-['DM_Mono',monospace] text-[9px] text-[var(--orange)]">
          {study.id}
        </span>
        <h3 className="m-0 text-[23px] font-normal tracking-[-0.045em]">
          {study.title}
        </h3>
        <p className="mt-[18px] max-w-[260px] text-pretty text-sm font-light leading-[1.7] text-[var(--muted)]">
          {study.body}
        </p>
      </div>
    </article>
  );
}

function StudiesPanel({ headingRef }) {
  return (
    <div className="h-full">
      <div className="mb-[70px] grid grid-cols-[1fr_0.62fr] items-end gap-[11vw] max-[900px]:grid-cols-2 max-[900px]:gap-[7vw] max-sm:block">
        <Reveal>
          <h2
            className="m-0 text-[clamp(56px,6.2vw,90px)] font-normal leading-[0.95] tracking-[-0.068em] text-balance focus:outline-none max-sm:text-[clamp(51px,15vw,70px)]"
            ref={headingRef}
            tabIndex={-1}
          >
            Three objects,
            <br />
            kept separate.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mb-[5px] max-w-[400px] text-pretty text-[14px] font-light leading-[1.75] text-[var(--muted)] max-sm:mt-7">
            The close-line field marks the point where access narrows. It is the
            same visual rule everywhere because it describes the same event
            everywhere.
          </p>
        </Reveal>
      </div>
      <div className="grid grid-cols-3 border border-[var(--line)] max-sm:grid-cols-1">
        {studies.map((study, index) => (
          <Reveal
            key={study.id}
            delay={0.1 + index * 0.08}
            y={22}
            className="min-w-0 border-r border-[var(--line)] last:border-r-0 max-sm:border-b max-sm:border-r-0 max-sm:last:border-b-0"
          >
            <StudyCard study={study} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Workspace({ headingRef }) {
  const [selected, setSelected] = useState(0);
  const [copyState, setCopyState] = useState("idle");
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("demo-password-not-a-real-secret");
      setCopyState("copied");
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("error");
    }
  };

  const move = (event, index) => {
    if (!["ArrowDown", "ArrowUp", "j", "k"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowDown" || event.key === "j" ? 1 : -1;
    const next = (index + direction + entries.length) % entries.length;
    setSelected(next);
    event.currentTarget.parentElement?.children[next]?.focus();
  };

  return (
    <div
      className="grid h-full min-h-[650px] grid-cols-[0.72fr_1.28fr] items-center gap-[54px] max-[900px]:gap-7 max-sm:min-h-[1320px] max-sm:grid-cols-1 max-sm:content-start max-sm:gap-[42px]"
      id="workspace"
    >
      <Reveal>
        <h2
          className="m-0 text-[clamp(52px,5.2vw,76px)] font-normal leading-[0.95] tracking-[-0.065em] text-balance focus:outline-none max-[900px]:text-[52px] max-sm:text-[51px]"
          ref={headingRef}
          tabIndex={-1}
        >
          Less interface.
          <br />
          More intention.
        </h2>
        <p className="mb-9 mt-7 max-w-[360px] text-pretty text-sm font-light leading-[1.75] text-[var(--muted)] max-sm:mb-7">
          Search, inspect, copy, leave. Silo’s shell keeps the useful path short
          and makes sensitive actions visible.
        </p>
        <dl className="m-0 border-t border-[var(--line)]">
          <div className="grid grid-cols-[1fr_auto] gap-3.5 border-b border-[var(--line)] py-3 font-['DM_Mono',monospace] text-[10px]">
            <dt className="text-[var(--orange)]">Navigation</dt>
            <dd className="m-0 text-right text-[var(--muted)]">
              Arrow keys or j / k
            </dd>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-3.5 border-b border-[var(--line)] py-3 font-['DM_Mono',monospace] text-[10px]">
            <dt className="text-[var(--orange)]">Copy password</dt>
            <dd className="m-0 text-right text-[var(--muted)]">
              c · clears after 20s
            </dd>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-3.5 border-b border-[var(--line)] py-3 font-['DM_Mono',monospace] text-[10px]">
            <dt className="text-[var(--orange)]">One-time code</dt>
            <dd className="m-0 text-right text-[var(--muted)]">
              o · generated locally
            </dd>
          </div>
        </dl>
      </Reveal>
      <Reveal delay={0.1} y={22}>
        <div
          className="overflow-hidden rounded-md border border-black/[0.18] bg-[var(--sheet)] shadow-[0_18px_45px_rgba(32,35,31,0.08)]"
          aria-label="Interactive preview of the Silo workspace"
        >
          <div className="flex min-h-[42px] items-center justify-between border-b border-[var(--line)] px-4 font-['DM_Mono',monospace] text-[10px] tracking-[0.04em] text-[var(--muted)]">
            <span>Silo</span>
            <span className="inline-flex items-center gap-[7px]">
              <i className="size-[5px] rounded-full bg-[var(--orange)]" />{" "}
              unlocked
            </span>
          </div>
          <div className="grid min-h-[410px] grid-cols-[0.78fr_1.22fr]">
            <div className="flex min-w-0 flex-col border-r border-[var(--line)]">
              <div className="border-b border-[var(--line)] px-3.5 py-[15px] font-['DM_Mono',monospace] text-[10px] font-light text-[var(--muted)]">
                <span className="mr-1 text-[var(--orange)]">/</span> Search
                authentications
              </div>
              <div className="grid gap-1 p-[7px]">
                {entries.map((entry, index) => (
                  <button
                    className="grid gap-[5px] rounded-[13px] border border-transparent bg-transparent px-3 py-[13px] text-left transition-colors duration-150 hover:border-[var(--line)] hover:bg-[rgba(251,251,248,0.72)] aria-pressed:border-black/[0.08] aria-pressed:bg-[var(--soft)] [&>span]:text-[11px] [&>span]:font-medium [&>small]:overflow-hidden [&>small]:text-ellipsis [&>small]:font-['DM_Mono',monospace] [&>small]:text-[10px] [&>small]:font-light [&>small]:text-[var(--muted)]"
                    key={entry.name}
                    aria-pressed={selected === index}
                    onClick={() => setSelected(index)}
                    onKeyDown={(event) => move(event, index)}
                  >
                    <span>{entry.name}</span>
                    <small>{entry.user}</small>
                  </button>
                ))}
              </div>
              <p className="mb-0 mt-auto border-t border-[var(--line)] px-3.5 py-3 font-['DM_Mono',monospace] text-[9px] font-light text-[var(--muted)]">
                {entries.length} entries · ↑↓ move · ↵ open
              </p>
            </div>
            <div className="flex min-w-0 flex-col p-6 max-sm:px-3.5 max-sm:py-[17px]">
              <p className="m-0 font-['DM_Mono',monospace] text-[10px] font-light text-[var(--muted)]">
                Authentication / {entries[selected].name}
              </p>
              <h3 className="mb-7 mt-2.5 text-[28px] font-normal tracking-[-0.045em]">
                {entries[selected].name}
              </h3>
              <div className="grid gap-[7px] border-t border-[var(--line)] py-[13px] [&>span]:font-['DM_Mono',monospace] [&>span]:text-[9px] [&>span]:font-light [&>span]:text-[var(--muted)] [&>span]:uppercase [&>strong]:overflow-hidden [&>strong]:text-ellipsis [&>strong]:whitespace-nowrap [&>strong]:font-['DM_Mono',monospace] [&>strong]:text-[10px] max-sm:[&>strong]:text-[9px]">
                <span>Username</span>
                <strong>{entries[selected].user}</strong>
              </div>
              <div className="grid gap-[7px] border-t border-[var(--line)] py-[13px] [&>span]:font-['DM_Mono',monospace] [&>span]:text-[9px] [&>span]:font-light [&>span]:text-[var(--muted)] [&>span]:uppercase [&>strong]:overflow-hidden [&>strong]:text-ellipsis [&>strong]:whitespace-nowrap [&>strong]:font-['DM_Mono',monospace] [&>strong]:text-[10px] max-sm:[&>strong]:text-[9px]">
                <span>Password</span>
                <strong>••••••••••••••••••</strong>
              </div>
              <div className="grid gap-[7px] border-t border-[var(--line)] py-[13px] [&>span]:font-['DM_Mono',monospace] [&>span]:text-[9px] [&>span]:font-light [&>span]:text-[var(--muted)] [&>span]:uppercase">
                <span>One-time code</span>
                <strong className="overflow-hidden text-ellipsis whitespace-nowrap font-['DM_Mono',monospace] text-[10px] text-[var(--orange)] tabular-nums max-sm:text-[9px]">
                  {entries[selected].totp}{" "}
                  <small className="ml-2 font-light text-[var(--muted)]">
                    18s
                  </small>
                </strong>
              </div>
              <button
                className="mt-auto inline-flex min-h-10 self-start items-center justify-center gap-[9px] rounded-full bg-[var(--ink)] px-[18px] font-['DM_Mono',monospace] text-[10px] text-white transition-colors duration-150 hover:bg-[#30332f] [&>svg]:w-3.5 [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:stroke-[1.4]"
                onClick={copy}
                aria-live="polite"
              >
                <CopyGlyph complete={copyState === "copied"} />
                {copyState === "copied"
                  ? "Copied · clears in 20s"
                  : copyState === "error"
                    ? "Clipboard unavailable"
                    : "Copy password"}
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function ObjectStudies() {
  const [active, setActive] = useState("studies");
  const studiesHeading = useRef(null);
  const workspaceHeading = useRef(null);
  const initial = useRef(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const target =
      active === "studies" ? studiesHeading.current : workspaceHeading.current;
    target?.focus({ preventScroll: true });
  }, [active]);

  useEffect(() => {
    const syncHash = () => {
      if (window.location.hash === "#workspace") setActive("workspace");
      if (window.location.hash === "#notes") setActive("studies");
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const panelState = (panel) => {
    if (panel === active) return { x: "0%", scale: 1, opacity: 1 };
    return panel === "studies"
      ? { x: "-99%", scale: 0.85, opacity: 0.72 }
      : { x: "99%", scale: 0.85, opacity: 0.72 };
  };

  const transition = reduce
    ? { duration: 0 }
    : { type: "spring", duration: 0.82, bounce: 0 };

  return (
    <motion.section
      className="relative overflow-hidden bg-[var(--paper)] py-[clamp(96px,10vw,150px)]"
      id="notes"
      data-active={active}
      animate={{
        backgroundColor: active === "workspace" ? "#dfe9ec" : "#f5f5f2",
      }}
      transition={reduce ? { duration: 0 } : { duration: 0.42, ease: easeMove }}
    >
      <Reveal className="relative z-[6]">
        <div
          className="mx-auto flex w-max gap-0.5 rounded-full border border-[var(--line)] bg-[rgba(251,251,248,0.94)] p-1"
          role="group"
          aria-label="Choose section"
        >
          {[
            ["studies", "Boundary studies"],
            ["workspace", "Workspace"],
          ].map(([value, label]) => (
            <button
              className="relative min-h-[34px] rounded-full bg-transparent px-[15px] text-xs"
              key={value}
              aria-pressed={active === value}
              onClick={() => setActive(value)}
            >
              {active === value && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-[var(--ink)]"
                  layoutId="active-study-tab"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 380,
                          damping: 34,
                          mass: 0.7,
                        }
                  }
                />
              )}
              <span
                className={`relative z-[1] transition-colors duration-150 ${active === value ? "text-white" : "text-[var(--muted)]"}`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </Reveal>
      <div className="relative mt-12 h-[760px] overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,#000_4%,#000_96%,transparent_100%)] max-sm:h-[1320px] max-sm:[mask-image:linear-gradient(to_right,transparent_0,#000_3%,#000_97%,transparent_100%)]">
        <div className="pointer-events-none absolute inset-0 grid [place-items:start_center]">
          <motion.div
            className="pointer-events-auto relative h-full w-[min(1240px,calc(100%_-_64px))] origin-center will-change-transform max-sm:w-[calc(100%_-_36px)]"
            data-active={active === "studies"}
            animate={panelState("studies")}
            transition={transition}
            style={{ zIndex: active === "studies" ? 2 : 1 }}
          >
            <div className="h-full" inert={active !== "studies"}>
              <StudiesPanel headingRef={studiesHeading} />
            </div>
            <motion.div
              className="pointer-events-none absolute inset-0 z-[2]"
              animate={{
                opacity: active === "studies" ? 0 : 0.62,
                backgroundColor: active === "workspace" ? "#dfe9ec" : "#f5f5f2",
              }}
              transition={transition}
              aria-hidden="true"
            />
          </motion.div>
        </div>
        <div className="pointer-events-none absolute inset-0 grid [place-items:start_center]">
          <motion.div
            className="pointer-events-auto relative h-full w-[min(1240px,calc(100%_-_64px))] origin-center will-change-transform max-sm:w-[calc(100%_-_36px)]"
            data-active={active === "workspace"}
            animate={panelState("workspace")}
            transition={transition}
            style={{ zIndex: active === "workspace" ? 2 : 1 }}
          >
            <div className="h-full" inert={active !== "workspace"}>
              <Workspace headingRef={workspaceHeading} />
            </div>
            <motion.div
              className="pointer-events-none absolute inset-0 z-[2]"
              animate={{
                opacity: active === "workspace" ? 0 : 0.62,
                backgroundColor: active === "workspace" ? "#dfe9ec" : "#f5f5f2",
              }}
              transition={transition}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

const LAYERS = [
  {
    id: "core",
    index: "01",
    name: "silo-core",
    note: "Encrypts the vault, derives keys with Argon2id, and writes atomically.",
    x: 210,
    y: 268,
  },
  {
    id: "cli",
    index: "02",
    name: "silo-cli",
    note: "The shell and commands you use day to day—unlock once, work, lock.",
    x: 210,
    y: 188,
  },
  {
    id: "broker",
    index: "03",
    name: "silo-broker",
    note: "Holds one local session in memory and ends it after inactivity.",
    x: 210,
    y: 348,
  },
  {
    id: "host",
    index: "04",
    name: "native host",
    note: "Hands the browser only the field you approve—never the master password.",
    x: 318,
    y: 348,
  },
];

function SiloDiagram({ active, onSelect }) {
  const ribs = Array.from({ length: 44 }, (_, i) => i);

  return (
    <svg
      className="relative z-[1] w-[min(100%,650px)] text-[var(--ink)]"
      viewBox="0 0 520 560"
      role="img"
      aria-labelledby="silo-title silo-desc"
    >
      <title id="silo-title">Silo architecture</title>
      <desc id="silo-desc">
        A corrugated grain silo with four selectable layers for core, CLI,
        broker, and native host.
      </desc>
      <defs>
        <pattern
          id="silo-knit"
          width="2.4"
          height="1"
          patternUnits="userSpaceOnUse"
        >
          <path d="M1 0v1" stroke="#141614" strokeWidth="0.95" />
        </pattern>
        <clipPath id="silo-body-clip">
          <path d="M160 130 V410 Q160 455 260 478 Q360 455 360 410 V130 Q360 95 260 72 Q160 95 160 130 Z" />
        </clipPath>
        <clipPath id="silo-roof-clip">
          <path d="M160 130 Q160 95 260 72 Q360 95 360 130 Q310 148 260 148 Q210 148 160 130 Z" />
        </clipPath>
      </defs>

      <g
        className="fill-none stroke-[var(--ink)] stroke-[1.15] opacity-[0.22] [vector-effect:non-scaling-stroke]"
        aria-hidden="true"
      >
        <path d="M48 130h424M48 410h424" />
        <path d="M100 55v455M420 55v455" />
      </g>

      <g clipPath="url(#silo-roof-clip)" aria-hidden="true">
        <rect
          className="stroke-none"
          x="155"
          y="70"
          width="210"
          height="90"
          fill="url(#silo-knit)"
        />
      </g>
      <path
        className="fill-none stroke-[var(--ink)] stroke-[1.15] [vector-effect:non-scaling-stroke]"
        d="M160 130 Q160 95 260 72 Q360 95 360 130"
        fill="none"
      />
      <ellipse
        className="fill-none stroke-[var(--ink)] stroke-[1.15] [vector-effect:non-scaling-stroke]"
        cx="260"
        cy="130"
        rx="100"
        ry="28"
      />
      <ellipse
        className="fill-none stroke-[var(--ink)] stroke-[1.15] opacity-40 [vector-effect:non-scaling-stroke]"
        cx="260"
        cy="118"
        rx="34"
        ry="11"
      />
      <circle
        className="fill-[var(--orange)] stroke-[var(--orange)]"
        cx="260"
        cy="112"
        r="4.5"
      />

      <g clipPath="url(#silo-body-clip)" aria-hidden="true">
        {ribs.map((i) => {
          const x = 162 + i * 4.5;
          return (
            <path
              key={i}
              className="fill-none stroke-[var(--ink)] stroke-1 opacity-55 [vector-effect:non-scaling-stroke]"
              d={`M${x} 130 V470`}
            />
          );
        })}
        <path
          className="stroke-none opacity-75"
          d="M260 130 H360 V410 Q340 450 300 468 Q275 476 260 478 Z"
          fill="url(#silo-knit)"
        />
      </g>
      <path
        className="fill-none stroke-[var(--ink)] stroke-[1.15] [vector-effect:non-scaling-stroke]"
        d="M160 130 V410 Q160 455 260 478 Q360 455 360 410 V130"
        fill="none"
      />
      <ellipse
        className="fill-none stroke-[var(--ink)] stroke-[1.15] [vector-effect:non-scaling-stroke]"
        cx="260"
        cy="130"
        rx="100"
        ry="28"
        fill="none"
      />
      <path
        className="fill-none stroke-[var(--ink)] stroke-[1.15] opacity-40 [vector-effect:non-scaling-stroke]"
        d="M160 410 Q210 432 260 438 Q310 432 360 410"
        fill="none"
      />

      <rect
        className="fill-none stroke-[var(--ink)] stroke-[1.15] [vector-effect:non-scaling-stroke]"
        x="238"
        y="352"
        width="44"
        height="72"
        rx="2"
        fill="none"
      />
      <rect
        className="stroke-none"
        x="242"
        y="356"
        width="36"
        height="64"
        fill="url(#silo-knit)"
      />
      <circle
        className="fill-[var(--orange)] stroke-[var(--orange)]"
        cx="270"
        cy="390"
        r="2.5"
      />

      <g
        className="fill-none stroke-[var(--ink)] stroke-[1.15] opacity-55 [vector-effect:non-scaling-stroke]"
        aria-hidden="true"
      >
        <path d="M372 145v290M388 145v290" />
        {Array.from({ length: 15 }, (_, i) => (
          <path key={i} d={`M372 ${158 + i * 18}h16`} />
        ))}
      </g>

      <g
        className="fill-none stroke-[var(--ink)] stroke-[1.15] opacity-35 [stroke-dasharray:3_4] [vector-effect:non-scaling-stroke]"
        aria-hidden="true"
      >
        <path d="M175 220 Q260 238 345 220" />
        <path d="M175 300 Q260 318 345 300" />
        <path d="M180 380 Q260 398 340 380" />
      </g>

      <path
        className="fill-none stroke-[var(--orange)] stroke-[1.35] opacity-70 [vector-effect:non-scaling-stroke]"
        d="M210 268 V188"
      />
      <path
        className="fill-none stroke-[var(--orange)] stroke-[1.35] opacity-70 [vector-effect:non-scaling-stroke]"
        d="M210 268 V348"
      />
      <path
        className="fill-none stroke-[var(--orange)] stroke-[1.35] opacity-70 [vector-effect:non-scaling-stroke]"
        d="M210 348 H300"
      />

      {LAYERS.map((layer) => (
        <g
          key={layer.id}
          className={`cursor-pointer outline-none [&>circle]:stroke-[1.25] [&>text]:pointer-events-none [&>text]:font-['DM_Mono',monospace] [&>text]:text-[10px] [&>text]:[text-anchor:middle] ${active === layer.id ? "[&>circle]:fill-[var(--orange)] [&>circle]:stroke-[var(--orange)] [&>text]:fill-white" : "[&>circle]:fill-[var(--sheet)] [&>circle]:stroke-[var(--ink)] [&>text]:fill-[var(--ink)]"}`}
          role="button"
          tabIndex={0}
          aria-label={`${layer.name}: ${layer.note}`}
          onClick={() => onSelect(layer.id)}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            onSelect(layer.id);
          }}
        >
          <circle cx={layer.x} cy={layer.y} r="18" />
          <text x={layer.x} y={layer.y + 4}>
            {layer.index}
          </text>
        </g>
      ))}

      <g
        className="fill-none stroke-[var(--ink)] [vector-effect:non-scaling-stroke] [&>text]:fill-[var(--muted)] [&>text]:font-['DM_Mono',monospace] [&>text]:stroke-[0.3] [&>text]:text-[9px] [&>text]:tracking-[0.14em]"
        aria-hidden="true"
      >
        <path d="M160 505v14h200v-14" />
        <text x="210" y="540">
          LOCAL MACHINE
        </text>
      </g>
    </svg>
  );
}

function System() {
  const [active, setActive] = useState("core");
  const selected = LAYERS.find((layer) => layer.id === active);
  const reduce = useReducedMotion();
  return (
    <section
      className="overflow-hidden bg-[var(--sheet)] py-[150px] max-sm:py-[105px]"
      id="system"
    >
      <div
        className={`${shell} mb-[70px] grid grid-cols-[1fr_0.62fr] items-end gap-[11vw] max-[900px]:grid-cols-2 max-[900px]:gap-[7vw] max-sm:block`}
      >
        <Reveal>
          <h2 className="m-0 text-[clamp(56px,6.2vw,90px)] font-normal leading-[1.04] tracking-[-0.068em] text-balance max-sm:text-[clamp(51px,15vw,70px)]">
            Four parts.
            <br />
            <span className="mt-[0.08em] inline-block bg-[var(--orange)] px-[0.13em] pb-[0.08em] pt-[0.03em] tracking-[-0.06em] text-white">
              One boundary.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mb-[5px] max-w-[400px] text-pretty text-[14px] font-light leading-[1.75] text-[var(--muted)] max-sm:mt-7">
            Built like the object it borrows its name from: a clear exterior,
            repeated structural ribs, a narrow access point, and a protected
            center.
          </p>
        </Reveal>
      </div>
      <div className="mx-auto grid min-h-[730px] w-[min(1380px,calc(100vw_-_48px))] grid-cols-[1fr_380px] bg-[var(--paper)] shadow-[0_0_0_1px_rgba(32,35,31,0.06)] max-[900px]:grid-cols-[1fr_320px] max-sm:min-h-0 max-sm:w-[calc(100vw_-_24px)] max-sm:grid-cols-1">
        <Reveal
          y={24}
          className="grid min-w-0 place-items-center overflow-hidden border-r border-[var(--line)] p-[42px] max-sm:min-h-[560px] max-sm:border-b max-sm:border-r-0 max-sm:p-5"
        >
          <SiloDiagram active={active} onSelect={setActive} />
        </Reveal>
        <Reveal
          delay={0.1}
          y={20}
          className="flex flex-col justify-center px-[24px] py-[52px] max-sm:px-[25px] max-sm:py-10"
        >
          <aside aria-live="polite">
            <p className="mb-[38px] mt-0 font-['DM_Mono',monospace] text-[9px] tracking-[0.1em] text-[var(--orange)] uppercase">
              Selected layer / {selected.index}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -5 }}
                transition={{ duration: 0.18, ease: easeOut }}
              >
                <h3 className="mb-3.5 mt-0 text-[27px] font-medium tracking-[-0.045em]">
                  {selected.name}
                </h3>
                <p className="m-0 min-h-[65px] text-pretty text-sm font-light leading-[1.7] text-[var(--muted)]">
                  {selected.note}
                </p>
              </motion.div>
            </AnimatePresence>
            <div
              className="mt-[52px] grid gap-1 border-t border-[var(--line)]"
              role="group"
              aria-label="Architecture layers"
            >
              {LAYERS.map((layer) => (
                <motion.button
                  className="flex gap-[18px] border border-transparent bg-transparent px-4 py-3.5 text-left font-['DM_Mono',monospace] text-[10px] transition-colors duration-150 hover:border-[var(--line)] hover:bg-[rgba(251,251,248,0.72)] aria-pressed:border-[var(--line)] aria-pressed:bg-[var(--sheet)] [&>span]:text-[var(--muted)] aria-pressed:[&>span]:text-[var(--orange)]"
                  key={layer.id}
                  onClick={() => setActive(layer.id)}
                  aria-pressed={active === layer.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                >
                  <span>{layer.index}</span>
                  {layer.name}
                </motion.button>
              ))}
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function StartJump({ headingRef, sourceRef, targetRef }) {
  const [route, setRoute] = useState(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      const heading = headingRef.current?.getBoundingClientRect();
      const source = sourceRef.current?.getBoundingClientRect();
      const target = targetRef.current?.getBoundingClientRect();
      if (!heading || !source || !target) return;

      const contactPoint = (letter, opticalX = 0.5) => ({
        x: letter.left - heading.left + letter.width * opticalX,
        y: letter.top - heading.top + letter.height * 0.23,
      });
      const start = contactPoint(source);
      const end = contactPoint(target, 0.65);
      end.y += 1;
      const contacts = Array.from({ length: 4 }, (_, index) => ({
        x: start.x + ((end.x - start.x) * index) / 3,
        y: start.y + ((end.y - start.y) * index) / 3,
      }));
      const equalArcHeight = Math.max(28, Math.min(38, heading.height * 0.2));
      const points = [];
      const steps = 24;

      for (let segment = 0; segment < 3; segment += 1) {
        const from = contacts[segment];
        const to = contacts[segment + 1];
        for (let step = segment === 0 ? 0 : 1; step <= steps; step += 1) {
          const t = step / steps;
          points.push({
            x: from.x + (to.x - from.x) * t,
            y:
              from.y +
              (to.y - from.y) * t -
              equalArcHeight * Math.sin(Math.PI * t),
          });
        }
      }

      const path = points.reduce(
        (value, point, index) =>
          `${value}${index === 0 ? "M" : " L"} ${point.x} ${point.y}`,
        "",
      );

      setRoute({
        width: heading.width,
        height: heading.height,
        path,
        x: points.map((point) => point.x),
        y: points.map((point) => point.y),
        times: points.map((_, index) => index / (points.length - 1)),
        start: contacts[0],
        end: contacts[3],
      });
    };

    const observer = new ResizeObserver(measure);
    if (headingRef.current) observer.observe(headingRef.current);
    document.fonts.ready.then(measure);
    measure();
    return () => observer.disconnect();
  }, [headingRef, sourceRef, targetRef]);

  if (!route) return null;

  return (
    <svg
      className="start-jump pointer-events-none absolute inset-0 z-[3] size-full overflow-visible"
      viewBox={`0 0 ${route.width} ${route.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {!reduce && (
        <motion.path
          d={route.path}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: [0, 1, 1], opacity: [0, 0.3, 0] }}
          viewport={viewportOnce}
          transition={{
            duration: 2.05,
            times: [0, 0.82, 1],
            ease: "linear",
            delay: 0.12,
          }}
        />
      )}
      <motion.circle
        r="8"
        initial={
          reduce ? false : { cx: route.start.x, cy: route.start.y, opacity: 1 }
        }
        animate={
          reduce ? { cx: route.end.x, cy: route.end.y, opacity: 1 } : undefined
        }
        whileInView={
          reduce
            ? undefined
            : {
                cx: route.x,
                cy: route.y,
                opacity: 1,
                scaleX: [1, 1, 1.16, 1, 1, 1.16, 1, 1, 1.12, 1],
                scaleY: [1, 1, 0.82, 1, 1, 0.82, 1, 1, 0.86, 1],
              }
        }
        viewport={viewportOnce}
        transition={
          reduce
            ? { duration: 0 }
            : {
                cx: {
                  duration: 1.8,
                  times: route.times,
                  ease: "linear",
                  delay: 0.2,
                },
                cy: {
                  duration: 1.8,
                  times: route.times,
                  ease: "linear",
                  delay: 0.2,
                },
                scaleX: {
                  duration: 1.8,
                  times: [
                    0, 0.29, 0.333, 0.38, 0.62, 0.666, 0.72, 0.94, 0.985, 1,
                  ],
                  ease: "linear",
                  delay: 0.2,
                },
                scaleY: {
                  duration: 1.8,
                  times: [
                    0, 0.29, 0.333, 0.38, 0.62, 0.666, 0.72, 0.94, 0.985, 1,
                  ],
                  ease: "linear",
                  delay: 0.2,
                },
              }
        }
      />
    </svg>
  );
}

function Start() {
  const [copyState, setCopyState] = useState("idle");
  const timer = useRef();
  const headingRef = useRef(null);
  const sourceRef = useRef(null);
  const targetRef = useRef(null);
  const command = "cargo run -p silo -- init";

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopyState("copied");
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("error");
    }
  };

  return (
    <section
      className="relative isolate overflow-x-clip bg-[var(--blue)] px-[5.5vw] pb-7 pt-[150px] max-sm:px-5 max-sm:pb-6 max-sm:pt-[105px]"
      id="start"
    >
      <div className="relative z-[2] mx-auto mb-[125px] max-w-[870px] overflow-visible text-center max-sm:mb-[90px]">
        <Reveal>
          <p className={`${monoLabel} mb-[27px]`}>Start with one file</p>
        </Reveal>
        <Reveal delay={0.08} y={22}>
          <h2
            className="relative m-0 overflow-visible text-[clamp(58px,7.4vw,108px)] font-normal leading-[0.98] tracking-[-0.062em] text-balance max-sm:text-[clamp(55px,15vw,75px)]"
            ref={headingRef}
            aria-label="Bring your vault closer to home."
          >
            Br
            <span ref={targetRef} aria-hidden="true">
              ı
            </span>
            ng your va<span ref={sourceRef}>u</span>lt
            <br />
            closer to home.
            <StartJump
              headingRef={headingRef}
              sourceRef={sourceRef}
              targetRef={targetRef}
            />
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mb-[49px] mt-[35px] max-w-[510px] text-sm font-light leading-[1.75] text-[var(--muted)]">
            Silo is an open-source CLI tool for local development. Read the
            code, run it locally, and understand every boundary before you trust
            it.
          </p>
        </Reveal>
        <Reveal delay={0.22} y={14}>
          <motion.button
            className="mx-auto flex w-[min(590px,100%)] items-center justify-between border-y border-[var(--ink)] bg-transparent py-[17px] text-left [&>code]:font-['DM_Mono',monospace] [&>code]:text-xs [&>code]:font-normal max-sm:[&>code]:text-xs [&>code>span]:text-[var(--orange)] [&>span]:inline-flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-xs [&>span>svg]:w-3.5 [&>span>svg]:fill-none [&>span>svg]:stroke-current [&>span>svg]:stroke-[1.4]"
            onClick={copy}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.12 }}
          >
            <code>
              <span>$</span> {command}
            </code>
            <span aria-live="polite">
              <CopyGlyph complete={copyState === "copied"} />
              {copyState === "copied"
                ? "Copied"
                : copyState === "error"
                  ? "Copy failed"
                  : "Copy command"}
            </span>
          </motion.button>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="relative z-50">
        <footer className="grid grid-cols-3 items-center border-t border-[var(--line)] pt-[25px] max-sm:grid-cols-[1fr_auto]">
          <a href="#top" aria-label="Silo home">
            <Brand />
          </a>
          <p className="m-0 text-center text-[9px] font-light text-[var(--muted)] max-sm:hidden">
            Educational prototype · not yet audited for critical credentials.
          </p>
          <a
            className="inline-flex items-center justify-self-end gap-[9px] text-[10px] [&>svg]:w-[18px] [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:stroke-[1.5]"
            href="/README.md"
          >
            Documentation <Arrow />
          </a>
        </footer>
      </Reveal>
    </section>
  );
}

export default function Homepage() {
  return (
    <main>
      <Hero />
      <ObjectStudies />
      <System />
      <Start />
    </main>
  );
}
