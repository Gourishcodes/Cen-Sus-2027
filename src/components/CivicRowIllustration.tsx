// Stylized Digital Census of India Hero Graphic
// Incorporates the India geographic silhouette watermark, sovereign security shield with Ashoka Chakra,
// and the digital census network connecting households to the National Data Centre.

export default function CivicRowIllustration() {
  return (
    <svg
      viewBox="0 0 680 230"
      width="100%"
      role="img"
      aria-label="Digital Census 2027 sovereign digital public infrastructure illustration"
      style={{ color: "var(--color-navy)", display: "block", margin: "0 auto", height: "auto" }}
    >
      <defs>
        <linearGradient id="flagAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF9933" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#138808" />
        </linearGradient>
      </defs>

      {/* Official Survey of India Compliant Geographic Map Silhouette Watermark */}
      <g opacity="0.08" transform="translate(252, 16) scale(0.37)" fill="currentColor" stroke="none">
        <path d="M 200,6 C 208,8 218,14 225,20 C 234,26 244,32 250,42 C 255,52 252,65 248,75 C 244,83 238,91 234,100 C 230,108 234,116 240,121 C 248,126 258,128 268,130 C 278,132 288,135 298,139 C 306,143 313,150 316,158 C 319,166 318,175 315,183 C 322,183 328,180 334,176 C 340,172 346,168 352,166 C 360,165 368,168 375,173 C 382,179 389,185 396,191 C 404,198 413,205 418,214 C 420,222 417,230 411,235 C 404,240 395,243 386,243 C 378,243 370,240 362,239 C 354,238 347,242 342,248 C 337,255 334,263 331,271 C 328,280 323,288 318,295 C 314,302 311,310 310,318 C 309,328 308,338 305,348 C 301,358 294,367 287,376 C 279,385 271,394 262,403 C 254,412 245,420 236,429 C 230,436 224,444 218,452 C 215,456 211,458 208,455 C 205,452 204,447 203,442 C 200,432 198,422 195,412 C 192,402 188,392 183,383 C 178,373 172,363 167,353 C 163,344 160,334 158,324 C 156,314 155,304 151,295 C 146,284 137,276 127,270 C 117,265 106,262 95,263 C 86,264 78,269 71,275 C 65,280 61,288 54,293 C 48,297 40,298 33,295 C 27,292 23,286 21,279 C 19,271 21,263 25,257 C 29,250 36,245 44,242 C 52,239 61,239 69,241 C 78,242 87,241 95,237 C 103,233 109,226 114,218 C 119,209 122,198 123,187 C 124,176 126,165 130,155 C 134,145 141,136 149,129 C 157,121 163,110 166,99 C 169,87 167,75 168,63 C 170,52 175,41 182,32 C 189,22 195,12 200,6 Z" />
      </g>

      {/* Background Subtle Ashoka Chakra Concentric Geometry */}
      <g opacity="0.10" transform="translate(340, 115)">
        <circle r="95" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle r="85" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <circle r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={95 * Math.cos((i * 15 * Math.PI) / 180)}
            y2={95 * Math.sin((i * 15 * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="1.2"
          />
        ))}
      </g>

      {/* Base Foundation Grid Line */}
      <line x1="30" y1="195" x2="650" y2="195" stroke="var(--color-line)" strokeWidth="2" />

      {/* Left: Indian Household & Citizens */}
      <g transform="translate(80, 55)" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* House Outline */}
        <path d="M10 65 L60 25 L110 65" />
        <path d="M25 60 L25 135 L95 135 L95 60" />
        <rect x="48" y="90" width="24" height="45" rx="2" />
        <line x1="60" y1="90" x2="60" y2="135" />

        {/* Citizen Figures */}
        <circle cx="140" cy="85" r="10" />
        <path d="M120 135 C120 110 160 110 160 135" />
        <circle cx="170" cy="95" r="8" />
        <path d="M155 135 C155 115 185 115 185 135" />

        {/* Digital Verification Check Badge */}
        <circle cx="105" cy="40" r="12" fill="var(--color-success-soft)" stroke="var(--color-success)" strokeWidth="1.8" />
        <path d="M99 40 L103 44 L111 36" stroke="var(--color-success)" strokeWidth="2" />
      </g>

      {/* Central Connector: Sovereign Shield with Integrated Ashoka Chakra Motif */}
      <g transform="translate(290, 68)" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Digital wave connections */}
        <path d="M-10 50 C20 20 80 20 110 50" strokeDasharray="4 4" stroke="var(--color-accent)" />
        <path d="M0 65 C30 35 70 35 100 65" strokeDasharray="4 4" stroke="var(--color-accent)" />

        {/* Sovereign Shield Card */}
        <rect x="25" y="24" width="50" height="60" rx="8" fill="var(--color-paper-raised)" stroke="var(--color-navy)" strokeWidth="2" />
        
        {/* Ashoka Chakra Motif inside Shield */}
        <g transform="translate(50, 54)">
          <circle r="16" fill="none" stroke="var(--color-navy)" strokeWidth="1.4" />
          <circle r="4" fill="var(--color-navy)" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2={16 * Math.cos((deg * Math.PI) / 180)}
              y2={16 * Math.sin((deg * Math.PI) / 180)}
              stroke="var(--color-navy)"
              strokeWidth="1.2"
            />
          ))}
        </g>
      </g>

      {/* Right: Sovereign Cloud / National Census Data Centre */}
      <g transform="translate(460, 50)" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Data Tower */}
        <rect x="30" y="30" width="100" height="110" rx="6" fill="var(--color-paper-raised)" stroke="var(--color-navy)" />
        <line x1="30" y1="65" x2="130" y2="65" stroke="var(--color-line)" />
        <line x1="30" y1="100" x2="130" y2="100" stroke="var(--color-line)" />

        {/* Server status indicators */}
        <circle cx="45" cy="48" r="3.5" fill="#0d7c4d" stroke="none" />
        <circle cx="60" cy="48" r="3.5" fill="#e36414" stroke="none" />
        <line x1="80" y1="48" x2="115" y2="48" stroke="currentColor" strokeWidth="2" />

        <circle cx="45" cy="83" r="3.5" fill="#0d7c4d" stroke="none" />
        <circle cx="60" cy="83" r="3.5" fill="#0d7c4d" stroke="none" />
        <line x1="80" y1="83" x2="115" y2="83" stroke="currentColor" strokeWidth="2" />

        <circle cx="45" cy="118" r="3.5" fill="#0d7c4d" stroke="none" />
        <circle cx="60" cy="118" r="3.5" fill="#0d7c4d" stroke="none" />
        <line x1="80" y1="118" x2="115" y2="118" stroke="currentColor" strokeWidth="2" />

        {/* Sovereign Flag Ribbon */}
        <path d="M80 15 L80 30" stroke="var(--color-accent)" strokeWidth="2" />
        <rect x="80" y="15" width="24" height="10" fill="url(#flagAccent)" stroke="none" />
      </g>
    </svg>
  );
}
