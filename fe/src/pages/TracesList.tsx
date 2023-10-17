import TableList from '../components/TableList';

export default function TracesList() {
  return (
    <div
      className="
      mt-20
    "
    >
      <h1
        className="
        text-3xl
        font-bold
        text-[#5A5A5B]
      "
      >
        Lista de rastreamentos
      </h1>

      <TableList />
    </div>
  );
}
