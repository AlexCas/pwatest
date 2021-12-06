export const data = {
  factory: 'Tultitlan',
  trcvstm: [
    {
      machine: '107B',
      time_out: 40.85,
      real_time: 83.02,
      percentage: 49.21,
    },
    {
      machine: '305A',
      time_out: 34.9,
      real_time: 198.03,
      percentage: 17.62,
    },
  ],
  machine_timeout: [
    {
      machine: '107B',
      time_out_percentage: 14.26,
      reason: 'AM Cambio de Molde',
    },
    {
      machine: '305A',
      time_out_percentage: 11.34,
      reason: 'FM-Falla de Maquina',
    },
  ],
  warehouse: {
    name: 'Nave 1',
    trcvstm: [
      {
        machine: '107B',
        time_out: 40.85,
        real_time: 83.02,
        percentage: 49.21,
      },
      {
        machine: '111B',
        time_out: 31.08,
        real_time: 136.58,
        percentage: 22.76,
      },
    ],
    machine_timeout: [
      {
        machine: '107B',
        time_out_percentage: 14.26,
        reason: 'AM Cambio de Molde',
      },
      {
        machine: '105A',
        time_out_percentage: 11.34,
        reason: 'FM-Falla de Maquina',
      },
    ],
  },
};
