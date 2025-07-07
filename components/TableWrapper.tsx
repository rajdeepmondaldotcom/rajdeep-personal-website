/**
 * A wrapper component for tables to make them horizontally scrollable.
 *
 * It wraps a standard `<table>` element in a `<div>` with styles that
 * enable horizontal scrolling on smaller screens, preventing table content
 * from breaking the page layout.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The table content to be rendered within the wrapper.
 * @returns {JSX.Element} The rendered table wrapper.
 */
const TableWrapper = ({ children }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  )
}

export default TableWrapper
