import { SVGAttributes } from 'react'

type CommentIconProps = SVGAttributes<SVGElement>

const CommentIcon = (props: CommentIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={props.color}
      fillRule="evenodd"
      d="M1.236 11.103c0-5.742 4.839-10.34 10.75-10.34 2.257 0 4.346.66 6.087 1.823 2.814 1.846 4.663 4.965 4.663 8.517 0 3.103-1.417 5.879-3.664 7.758.096.117.197.247.299.384.208.28.43.608.602.94.162.314.329.72.329 1.132 0 .696-.415 1.234-.892 1.544a2.323 2.323 0 0 1-1.72.328c-1.213-.253-2.71-.71-3.887-1.095a74.634 74.634 0 0 1-1.915-.657l-.036-.013c-3.37-.04-6.383-1.567-8.301-3.95a9.959 9.959 0 0 1-2.315-6.37Zm11.009 8.868.009.003.029.01.113.041c.1.036.244.088.425.151.362.128.87.303 1.45.493 1.166.382 2.598.816 3.725 1.052a.823.823 0 0 0 .597-.118c.174-.113.209-.23.209-.286 0-.044-.03-.188-.16-.441a5.654 5.654 0 0 0-.475-.737 10.707 10.707 0 0 0-.667-.808l-.045-.048-.01-.011-.003-.003a.75.75 0 0 1 .11-1.127c2.251-1.604 3.684-4.162 3.684-7.039 0-3.014-1.567-5.677-3.988-7.264l-.006-.004c-1.495-1-3.295-1.571-5.256-1.571-5.143 0-9.25 3.984-9.25 8.84 0 2.036.733 3.92 1.973 5.416l.007.01c1.657 2.06 4.296 3.395 7.27 3.395a.75.75 0 0 1 .259.046Z"
      clipRule="evenodd"
    />
  </svg>
)
export default CommentIcon
