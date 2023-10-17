/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTraces } from '../service';

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
        </thead>

        <tbody
          className="
          text-left
          text-[#525A6A]
          gap-2
        "
        >
          {traces.map((trace) => (
            <tr
              key={trace._id}
              className="cursor-pointer
          hover:bg-[#e7eaee]
          "
              onClick={() => {
                navigate(`/traces/${trace.traceId}`);
              }}
            >
              <td
                className="
                font-bold
                py-2
                px-6
                truncate
                max-w-[300px]

              "
              >
                {trace.traceId}
              </td>
              <td>{formatDate(trace.createdAt)}</td>
              <td>{formatDate(trace.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
