// import { motion, useReducedMotion } from "framer-motion";

// const MOTION_TAGS = {
//   div: motion.div,
//   section: motion.section,
//   article: motion.article,
//   header: motion.header,
//   aside: motion.aside,
//   main: motion.main,
// };

// export function ScrollReveal({
//   children,
//   className,
//   as = "div",
//   delay = 0,
//   amount = 0.2,
//   y = 46,
//   scale = 0.97,
//   duration = 0.65,
//   ...rest
// }) {
//   const reduceMotion = useReducedMotion();
//   const Component = MOTION_TAGS[as] ?? motion.div;

//   // Intro overlay running ho to ScrollReveal animations ko pause karna hai,
//   // taaki page load/reload par content jump/slide na kare.
//   const introLocked = typeof document !== "undefined" &&
//     (document.body?.dataset?.intro === "playing" || document.body?.classList?.contains("intro-lock"));

//   if (reduceMotion || introLocked) {
//     return (
//       <Component className={className} {...rest}>
//         {children}
//       </Component>
//     );
//   }


//   return (
//     <Component
//       className={className}
//       initial={{ opacity: 0, y, scale }}
//       whileInView={{ opacity: 1, y: 0, scale: 1 }}
//       viewport={{ once: true, amount }}
//       transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
//       {...rest}
//     >
//       {children}
//     </Component>
//   );
// }


export function ScrollReveal({
  children,
  className,
  as = "div",
  ...rest
}) {
  const Component = as;
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}
