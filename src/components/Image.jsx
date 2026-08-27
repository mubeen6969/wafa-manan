/**
 * Thin wrapper around <img> that defaults to lazy-loading + async decoding.
 * Pass `priority` for above-the-fold images that should load eagerly instead.
 */
export default function Image({
  src,
  alt = "",
  className,
  priority = false,
  loading,
  decoding = "async",
  ...rest
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={decoding}
      // React 18 doesn't know the fetchPriority prop's casing yet - the
      // lowercase attribute name is what actually reaches the DOM node.
      fetchpriority={priority ? "high" : "auto"}
      {...rest}
    />
  );
}
