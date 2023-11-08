/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteTrace, getTraces } from '../service';

import formatDate from '../utils/date';

import { Trace } from '../types/Trace';

export default function TableList() {
  const [traces, setTraces] = useState<Trace[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadTraces() {
      const traceList = await getTraces();

      setTraces(traceList);
    }

    loadTraces();
  }, []);

  const handleDelete = async (traceId: string) => {
    await deleteTrace(traceId);

    const traceList = await getTraces();

    setTraces(traceList);
  };

  return (
    <div
      className="
        mt-10
        w-full
        border-[#E7EAEE]
        border-2
        rounded-xl
      "
    >
      <table
        className="
        w-full
      "
      >
        <thead
          className="
          bg-[#e7eaee]
          text-left
          text-[#868D9B]
          px-2
        "
        >
          <th
            className="
            py-2
            px-6
          "
          >
            NOME
          </th>
          <th>DATA DE CRIAÇÃO</th>
          <th>DATA DE ATUALIZAÇÃO</th>
          <th>AÇÕES</th>
        </thead>

        <tbody
          className="
          text-left
          text-[#525A6A]
          gap-2
        "
        >
          {traces.map((trace) => (
            <tr key={trace._id}>
              <td
                className="
                font-bold
                py-2
                px-6
                truncate
                max-w-[300px]
                cursor-pointer
              "
                onClick={() => {
                  navigate(`/traces/${trace.traceId}`);
                }}
              >
                {trace.traceId}
              </td>
              <td
                className="
                  cursor-pointer
                "
                onClick={() => {
                  navigate(`/traces/${trace.traceId}`);
                }}
              >
                {formatDate(trace.createdAt)}
              </td>
              <td
                className="
                  cursor-pointer
                "
                onClick={() => {
                  navigate(`/traces/${trace.traceId}`);
                }}
              >
                {formatDate(trace.updatedAt)}
              </td>
              <td>
                <span
                  className="
                    text-[#FF0000]
                    cursor-pointer
                  "
                  onClick={() => {
                    handleDelete(trace.traceId);
                  }}
                >
                  Apagar
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
