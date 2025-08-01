import React from "react";
import { VirtualPetAnimation, VirtualPetMood } from "../../types/pet-types";
import "./pet-animations.css";

interface PetSVGProps {
  animation: VirtualPetAnimation;
  mood: VirtualPetMood;
  isAlive: boolean;
  size?: number;
}

const PetSVG: React.FC<PetSVGProps> = ({
  animation,
  mood,
  isAlive,
  size = 32,
}) => {
  const getBodyColor = (): string => {
    if (!isAlive) return "var(--pet-dead)";

    switch (mood) {
      case VirtualPetMood.HAPPY:
        return "var(--pet-happy)";
      case VirtualPetMood.SAD:
        return "var(--pet-sad)";
      case VirtualPetMood.ANGRY:
        return "var(--pet-angry)";
      case VirtualPetMood.SICK:
        return "var(--pet-sick)";
      case VirtualPetMood.HUNGRY:
        return "var(--pet-hungry)";
      case VirtualPetMood.DIRTY:
        return "var(--pet-dirty)";
      case VirtualPetMood.SLEEPING:
        return "var(--pet-sleeping)";
      default:
        return "var(--pet-happy)";
    }
  };

  const getBodyShade = (): string => {
    if (!isAlive) return "var(--pet-dead-shade)";

    switch (mood) {
      case VirtualPetMood.HAPPY:
        return "var(--pet-happy-shade)";
      case VirtualPetMood.SAD:
        return "var(--pet-sad-shade)";
      case VirtualPetMood.ANGRY:
        return "var(--pet-angry-shade)";
      case VirtualPetMood.SICK:
        return "var(--pet-sick-shade)";
      case VirtualPetMood.HUNGRY:
        return "var(--pet-hungry-shade)";
      case VirtualPetMood.DIRTY:
        return "var(--pet-dirty-shade)";
      case VirtualPetMood.SLEEPING:
        return "var(--pet-sleeping-shade)";
      default:
        return "var(--pet-happy-shade)";
    }
  };

  const getEyeState = () => {
    if (!isAlive) {
      return (
        <>
          {/* X eyes for dead */}
          <g stroke="var(--pet-eye-pupil)" strokeWidth="1.5" fill="none">
            <line x1="8" y1="8" x2="12" y2="12" />
            <line x1="12" y1="8" x2="8" y2="12" />
            <line x1="20" y1="8" x2="24" y2="12" />
            <line x1="24" y1="8" x2="20" y2="12" />
          </g>
        </>
      );
    }

    if (
      animation === VirtualPetAnimation.SLEEPING ||
      mood === VirtualPetMood.SLEEPING
    ) {
      return (
        <>
          {/* Closed eyes */}
          <path
            d="M8 10 Q10 8 12 10"
            stroke="var(--pet-eye-pupil)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M20 10 Q22 8 24 10"
            stroke="var(--pet-eye-pupil)"
            strokeWidth="1.5"
            fill="none"
          />
        </>
      );
    }

    if (animation === VirtualPetAnimation.YAWNING) {
      return (
        <>
          {/* Half-closed sleepy eyes */}
          <ellipse
            cx="10"
            cy="10"
            rx="2.5"
            ry="1"
            fill="var(--pet-eye-white)"
            stroke="var(--pet-eye-pupil)"
            strokeWidth="0.8"
          />
          <ellipse
            cx="22"
            cy="10"
            rx="2.5"
            ry="1"
            fill="var(--pet-eye-white)"
            stroke="var(--pet-eye-pupil)"
            strokeWidth="0.8"
          />
          <circle cx="10" cy="10" r="0.8" fill="var(--pet-eye-pupil)" />
          <circle cx="22" cy="10" r="0.8" fill="var(--pet-eye-pupil)" />
        </>
      );
    }

    if (animation === VirtualPetAnimation.LOOKING_AROUND) {
      return (
        <>
          {/* Wide alert eyes */}
          <ellipse
            cx="10"
            cy="10"
            rx="3"
            ry="2.5"
            fill="#FFF"
            stroke="var(--pet-eye-pupil)"
            strokeWidth="0.8"
          />
          <ellipse
            cx="22"
            cy="10"
            rx="3"
            ry="2.5"
            fill="#FFF"
            stroke="var(--pet-eye-pupil)"
            strokeWidth="0.8"
          />
          <circle cx="11" cy="10" r="1.5" fill="var(--pet-eye-pupil)" className="animate-pulse" />
          <circle cx="21" cy="10" r="1.5" fill="var(--pet-eye-pupil)" className="animate-pulse" />
          <circle cx="10.5" cy="9" r="0.4" fill="var(--pet-eye-white)" />
          <circle cx="20.5" cy="9" r="0.4" fill="var(--pet-eye-white)" />
        </>
      );
    }

    if (mood === VirtualPetMood.ANGRY) {
      return (
        <>
          {/* Angry eyes */}
          <ellipse
            cx="10"
            cy="10"
            rx="2.5"
            ry="2"
            fill="#FFF"
            stroke="var(--pet-eye-pupil)"
            strokeWidth="0.8"
          />
          <ellipse
            cx="22"
            cy="10"
            rx="2.5"
            ry="2"
            fill="#FFF"
            stroke="var(--pet-eye-pupil)"
            strokeWidth="0.8"
          />
          <circle cx="10" cy="10" r="1.5" fill="var(--pet-eye-angry)" />
          <circle cx="22" cy="10" r="1.5" fill="var(--pet-eye-angry)" />
          <circle cx="9.5" cy="9" r="0.4" fill="var(--pet-eye-white)" />
          <circle cx="21.5" cy="9" r="0.4" fill="var(--pet-eye-white)" />
          {/* Angry eyebrows */}
          <path
            d="M6 6 L14 8"
            stroke="var(--pet-eye-pupil)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M26 6 L18 8"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      );
    }

    if (mood === VirtualPetMood.SAD) {
      return (
        <>
          {/* Sad eyes */}
          <ellipse
            cx="10"
            cy="10"
            rx="2.5"
            ry="2"
            fill="#FFF"
            stroke="#000"
            strokeWidth="0.8"
          />
          <ellipse
            cx="22"
            cy="10"
            rx="2.5"
            ry="2"
            fill="#FFF"
            stroke="#000"
            strokeWidth="0.8"
          />
          <circle cx="10" cy="10" r="1.5" fill="var(--pet-eye-pupil)" />
          <circle cx="22" cy="10" r="1.5" fill="var(--pet-eye-pupil)" />
          <circle cx="9.5" cy="9" r="0.4" fill="var(--pet-eye-white)" />
          <circle cx="21.5" cy="9" r="0.4" fill="var(--pet-eye-white)" />
          {/* Sad eyebrows */}
          <path
            d="M6 8 Q10 6 14 8"
            stroke="#000"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M18 8 Q22 6 26 8"
            stroke="#000"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Tears */}
          <ellipse
            cx="8"
            cy="12"
            rx="0.8"
            ry="1.5"
            fill="var(--pet-tear)"
            opacity="0.8"
          />
          <ellipse
            cx="24"
            cy="12"
            rx="0.8"
            ry="1.5"
            fill="var(--pet-tear)"
            opacity="0.8"
          />
        </>
      );
    }

    // Normal/happy eyes
    return (
      <>
        {/* Eye whites */}
        <ellipse
          cx="10"
          cy="10"
          rx="2.5"
          ry="2"
          fill="#FFF"
          stroke="#000"
          strokeWidth="0.8"
        />
        <ellipse
          cx="22"
          cy="10"
          rx="2.5"
          ry="2"
          fill="#FFF"
          stroke="#000"
          strokeWidth="0.8"
        />

        {/* Pupils */}
        <circle cx="10" cy="10" r="1.5" fill="#000" />
        <circle cx="22" cy="10" r="1.5" fill="#000" />

        {/* Eye highlights */}
        <circle cx="9.5" cy="9" r="0.6" fill="#FFF" />
        <circle cx="21.5" cy="9" r="0.6" fill="#FFF" />
        <circle cx="9" cy="9.5" r="0.3" fill="#FFF" />
        <circle cx="21" cy="9.5" r="0.3" fill="#FFF" />

        {mood === VirtualPetMood.HAPPY && (
          <>
            {/* Extra sparkle for happy */}
            <circle cx="11" cy="8.5" r="0.2" fill="#FFF" />
            <circle cx="23" cy="8.5" r="0.2" fill="#FFF" />
          </>
        )}
      </>
    );
  };

  const getMouthState = () => {
    if (!isAlive) {
      return (
        <path
          d="M12 18 Q16 22 20 18"
          stroke="#000"
          strokeWidth="1.5"
          fill="none"
        />
      );
    }

    if (animation === VirtualPetAnimation.EATING) {
      return (
        <>
          <circle
            cx="16"
            cy="18"
            r="3"
            fill="none"
            stroke="#000"
            strokeWidth="1.5"
          />
          <circle cx="16" cy="18" r="1" fill="#8B4513" />
        </>
      );
    }

    if (
      animation === VirtualPetAnimation.SLEEPING ||
      mood === VirtualPetMood.SLEEPING
    ) {
      return (
        <>
          <ellipse cx="16" cy="18" rx="2" ry="1" fill="#000" />
          {/* Z's for sleeping */}
          <text x="24" y="8" fontSize="4" fill="#666">
            Z
          </text>
          <text x="26" y="6" fontSize="3" fill="#999">
            z
          </text>
          <text x="28" y="4" fontSize="2" fill="#CCC">
            z
          </text>
        </>
      );
    }

    if (animation === VirtualPetAnimation.YAWNING) {
      return (
        <>
          {/* Wide open yawning mouth */}
          <ellipse
            cx="16"
            cy="19"
            rx="3"
            ry="4"
            fill="#000"
            stroke="#333"
            strokeWidth="1"
            className="animate-pulse"
          />
          <ellipse cx="16" cy="18" rx="2" ry="2" fill="#333" />
        </>
      );
    }

    if (animation === VirtualPetAnimation.STRETCHING) {
      return (
        <>
          {/* Concentrated expression */}
          <ellipse cx="16" cy="18" rx="1.5" ry="0.8" fill="#000" />
        </>
      );
    }

    if (animation === VirtualPetAnimation.LOOKING_AROUND) {
      return (
        <>
          {/* Curious small mouth */}
          <circle cx="16" cy="18" r="1" fill="#000" />
        </>
      );
    }

    if (animation === VirtualPetAnimation.BOUNCING || animation === VirtualPetAnimation.WIGGLING) {
      return (
        <>
          {/* Excited smile */}
          <path
            d="M12 16 Q16 20 20 16"
            stroke="#000"
            strokeWidth="1.5"
            fill="none"
          />
        </>
      );
    }

    if (mood === VirtualPetMood.HAPPY) {
      return (
        <path
          d="M12 16 Q16 20 20 16"
          stroke="#000"
          strokeWidth="1.5"
          fill="none"
        />
      );
    }

    if (mood === VirtualPetMood.SAD) {
      return (
        <path
          d="M12 20 Q16 16 20 20"
          stroke="#000"
          strokeWidth="1.5"
          fill="none"
        />
      );
    }

    if (mood === VirtualPetMood.ANGRY) {
      return <path d="M12 18 L20 18" stroke="#000" strokeWidth="2" />;
    }

    if (mood === VirtualPetMood.HUNGRY) {
      return (
        <>
          <circle
            cx="16"
            cy="18"
            r="2"
            fill="none"
            stroke="#000"
            strokeWidth="1.5"
          />
          <path
            d="M14 18 Q16 20 18 18"
            stroke="#FF69B4"
            strokeWidth="1"
            fill="none"
          />
        </>
      );
    }

    if (mood === VirtualPetMood.SICK) {
      return (
        <>
          <path
            d="M12 18 Q16 22 20 18"
            stroke="#90EE90"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="11" cy="16" r="1" fill="#90EE90" opacity="0.7" />
        </>
      );
    }

    // Default mouth
    return <ellipse cx="16" cy="18" rx="2" ry="1" fill="#000" />;
  };

  const getSpecialEffects = () => {
    if (animation === VirtualPetAnimation.PLAYING) {
      return (
        <>
          {/* Sparkles for playing */}
          <g fill="#FFD700" className="animate-pulse">
            <polygon points="4,4 5,6 7,6 5.5,7.5 6,10 4,8.5 2,10 2.5,7.5 1,6 3,6" />
            <polygon points="26,4 27,6 29,6 27.5,7.5 28,10 26,8.5 24,10 24.5,7.5 23,6 25,6" />
            <polygon points="4,24 5,26 7,26 5.5,27.5 6,30 4,28.5 2,30 2.5,27.5 1,26 3,26" />
            <polygon points="26,24 27,26 29,26 27.5,27.5 28,30 26,28.5 24,30 24.5,27.5 23,26 25,26" />
          </g>
          <g fill="#FF69B4" opacity="0.8" className="animate-bounce">
            <circle cx="8" cy="8" r="1" />
            <circle cx="24" cy="6" r="0.8" />
            <circle cx="6" cy="26" r="0.6" />
            <circle cx="26" cy="28" r="1.2" />
          </g>
        </>
      );
    }

    if (animation === VirtualPetAnimation.BOUNCING) {
      return (
        <>
          {/* Bounce effects */}
          <g fill="#87CEEB" opacity="0.6" className="animate-bounce">
            <circle cx="12" cy="28" r="1.5" />
            <circle cx="20" cy="28" r="1.5" />
          </g>
          <g fill="#FFD700" opacity="0.7">
            <circle cx="16" cy="6" r="0.8" className="animate-ping" />
          </g>
        </>
      );
    }

    if (animation === VirtualPetAnimation.WIGGLING) {
      return (
        <>
          {/* Wiggle motion lines */}
          <g stroke="#FF69B4" strokeWidth="1" fill="none" opacity="0.5" className="animate-pulse">
            <path d="M2 16 Q8 14 14 16 Q20 18 26 16 Q30 14 32 16" />
            <path d="M2 20 Q8 18 14 20 Q20 22 26 20 Q30 18 32 20" />
          </g>
        </>
      );
    }

    if (animation === VirtualPetAnimation.STRETCHING) {
      return (
        <>
          {/* Stretch lines */}
          <g stroke="#90EE90" strokeWidth="1.5" fill="none" opacity="0.6">
            <path d="M16 4 L16 0" strokeLinecap="round" />
            <path d="M16 28 L16 32" strokeLinecap="round" />
            <path d="M4 16 L0 16" strokeLinecap="round" />
            <path d="28 16 L32 16" strokeLinecap="round" />
          </g>
        </>
      );
    }

    if (animation === VirtualPetAnimation.LOOKING_AROUND) {
      return (
        <>
          {/* Attention indicators */}
          <g fill="#FFD700" opacity="0.8">
            <circle cx="6" cy="6" r="0.5" className="animate-ping" />
            <circle cx="26" cy="6" r="0.5" className="animate-ping" style={{animationDelay: '0.5s'}} />
            <circle cx="6" cy="26" r="0.5" className="animate-ping" style={{animationDelay: '1s'}} />
            <circle cx="26" cy="26" r="0.5" className="animate-ping" style={{animationDelay: '1.5s'}} />
          </g>
        </>
      );
    }

    if (animation === VirtualPetAnimation.YAWNING) {
      return (
        <>
          {/* Yawn effects */}
          <g fill="#87CEEB" opacity="0.4">
            <ellipse cx="16" cy="18" rx="4" ry="2" className="animate-pulse" />
          </g>
          <g fill="#DDD" opacity="0.6">
            <circle cx="20" cy="12" r="0.8" className="animate-bounce" />
            <circle cx="22" cy="10" r="0.6" className="animate-bounce" style={{animationDelay: '0.3s'}} />
            <circle cx="24" cy="8" r="0.4" className="animate-bounce" style={{animationDelay: '0.6s'}} />
          </g>
        </>
      );
    }

    if (mood === VirtualPetMood.DIRTY) {
      return (
        <>
          {/* Dirt spots */}
          <g fill="#654321" opacity="0.7">
            <circle cx="8" cy="14" r="1.5" />
            <circle cx="24" cy="16" r="1" />
            <circle cx="12" cy="24" r="1.2" />
            <circle cx="20" cy="26" r="0.8" />
            <circle cx="14" cy="18" r="0.6" />
          </g>
          {/* Stink lines */}
          <g
            stroke="#8B4513"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
            className="animate-pulse"
          >
            <path d="M10 6 Q12 4 10 2" />
            <path d="M22 6 Q24 4 22 2" />
            <path d="M16 4 Q18 2 16 0" />
          </g>
        </>
      );
    }

    if (mood === VirtualPetMood.SICK) {
      return (
        <>
          {/* Sick swirls */}
          <g
            stroke="#90EE90"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
            className="animate-spin"
          >
            <circle cx="8" cy="8" r="2" strokeDasharray="3,2" />
            <circle cx="24" cy="8" r="1.5" strokeDasharray="2,1" />
          </g>
        </>
      );
    }

    if (animation === VirtualPetAnimation.EATING) {
      return (
        <>
          {/* Food crumbs */}
          <g fill="#8B4513" opacity="0.6">
            <circle cx="12" cy="22" r="0.5" />
            <circle cx="20" cy="24" r="0.3" />
            <circle cx="18" cy="21" r="0.4" />
          </g>
        </>
      );
    }

    return null;
  };

  const getAnimationClass = (): string => {
    switch (animation) {
      case VirtualPetAnimation.WALKING:
        return "animate-bounce pet-smooth-transition";
      case VirtualPetAnimation.EATING:
        return "animate-pulse pet-smooth-transition";
      case VirtualPetAnimation.PLAYING:
        return "animate-spin pet-excited";
      case VirtualPetAnimation.BOUNCING:
        return "pet-float-bounce pet-smooth-transition";
      case VirtualPetAnimation.WIGGLING:
        return "pet-wiggle pet-smooth-transition";
      case VirtualPetAnimation.STRETCHING:
        return "pet-stretch pet-smooth-transition";
      case VirtualPetAnimation.LOOKING_AROUND:
        return "pet-look-around pet-smooth-transition";
      case VirtualPetAnimation.YAWNING:
        return "pet-yawn pet-sleepy";
      case VirtualPetAnimation.IDLE:
        return mood === VirtualPetMood.HAPPY ? "pet-happy-idle pet-smooth-transition" : "pet-gentle-float pet-smooth-transition";
      default:
        return "pet-smooth-transition";
    }
  };

  const getMoodClass = (): string => {
    if (!isAlive) return "";
    
    switch (mood) {
      case VirtualPetMood.HAPPY:
        return "pet-mood-happy";
      case VirtualPetMood.SAD:
        return "pet-mood-sad";
      case VirtualPetMood.SLEEPING:
        return "pet-mood-sleepy";
      default:
        return "";
    }
  };

  return (
    <div className={`${getAnimationClass()} ${getMoodClass()} pet-interactive`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        style={{
          filter: isAlive ? "none" : "grayscale(100%) brightness(0.7)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <defs>
          {/* Gradients for 3D effect */}
          <radialGradient id="bodyGradient" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor={getBodyColor()} />
            <stop offset="70%" stopColor={getBodyColor()} />
            <stop offset="100%" stopColor={getBodyShade()} />
          </radialGradient>
          <radialGradient id="headGradient" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor={getBodyColor()} />
            <stop offset="70%" stopColor={getBodyColor()} />
            <stop offset="100%" stopColor={getBodyShade()} />
          </radialGradient>
          {/* Shadow filter */}
          <filter id="shadow">
            <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Body shadow */}
        <ellipse cx="17" cy="21" rx="12" ry="10" fill="#00000020" />

        {/* Body */}
        <ellipse
          cx="16"
          cy="20"
          rx="12"
          ry="10"
          fill="url(#bodyGradient)"
          stroke="#000"
          strokeWidth="1.2"
          filter="url(#shadow)"
        />

        {/* Head shadow */}
        <circle cx="17" cy="13" r="8" fill="#00000020" />

        {/* Head */}
        <circle
          cx="16"
          cy="12"
          r="8"
          fill="url(#headGradient)"
          stroke="#000"
          strokeWidth="1.2"
          filter="url(#shadow)"
        />

        {/* Head highlight */}
        <ellipse cx="13" cy="9" rx="3" ry="2" fill="#FFFFFF40" />

        {/* Body highlight */}
        <ellipse cx="13" cy="17" rx="4" ry="3" fill="#FFFFFF30" />

        {/* Eyes */}
        {getEyeState()}

        {/* Mouth */}
        {getMouthState()}

        {/* Special effects */}
        {getSpecialEffects()}

        {/* Cheeks for happy mood */}
        {mood === VirtualPetMood.HAPPY && isAlive && (
          <>
            <ellipse
              cx="6"
              cy="14"
              rx="2.5"
              ry="2"
              fill="#FF69B4"
              opacity="0.4"
            />
            <ellipse
              cx="26"
              cy="14"
              rx="2.5"
              ry="2"
              fill="#FF69B4"
              opacity="0.4"
            />
            <ellipse
              cx="6"
              cy="13"
              rx="1.5"
              ry="1"
              fill="#FFB6C1"
              opacity="0.6"
            />
            <ellipse
              cx="26"
              cy="13"
              rx="1.5"
              ry="1"
              fill="#FFB6C1"
              opacity="0.6"
            />
          </>
        )}

        {/* Belly spot */}
        {isAlive && <ellipse cx="16" cy="22" rx="6" ry="4" fill="#FFFFFF20" />}
      </svg>
    </div>
  );
};

export default PetSVG;
