export function Logomark(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 36 36" fill="none" {...props}>
      <rect width="36" height="36" rx="8" fill="#ff9700" />
      <text
        x="18"
        y="23"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="12"
        fontWeight="700"
        fill="#fff"
      >
        FDS
      </text>
    </svg>
  )
}

export function Logo(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 240 36" fill="none" {...props}>
      <rect width="36" height="36" rx="8" fill="#ff9700" />
      <text
        x="18"
        y="23"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="12"
        fontWeight="700"
        fill="#fff"
      >
        FDS
      </text>
      <text
        x="48"
        y="16"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="12"
        fontWeight="700"
        letterSpacing="-0.01em"
        fill="currentColor"
      >
        FDS
      </text>
      <text
        x="48"
        y="29"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="11"
        fontWeight="500"
        letterSpacing="-0.005em"
        fill="currentColor"
        opacity="0.65"
      >
        Flowtitude Design System
      </text>
    </svg>
  )
}
