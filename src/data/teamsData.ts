import { Team } from '@/types/dataType';

export const teams: Team[] = [
  {
    id: 'csk',
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    logo: 'https://scores.iplt20.com/ipl/teamlogos/CSK.png',
    color: '#FFFF3C'
  },
  {
    id: 'mi',
    name: 'Mumbai Indians',
    shortName: 'MI',
    logo: 'https://scores.iplt20.com/ipl/teamlogos/MI.png',
    color: '#004BA0'
  },
  {
    id: 'rcb',
    name: 'Royal Challengers Bangalore',
    shortName: 'RCB',
    logo: 'https://scores.iplt20.com/ipl/teamlogos/aFPMviEPyJ1710927747rcb.png',
    color: '#EC1C24'
  },
  {
    id: 'kkr',
    name: 'Kolkata Knight Riders',
    shortName: 'KKR',
    logo: 'https://scores.iplt20.com/ipl/teamlogos/KKR.png',
    color: '#3A225D'
  },
  {
    id: 'dc',
    name: 'Delhi Capitals',
    shortName: 'DC',
    logo: 'https://scores.iplt20.com/ipl/teamlogos/DC.png',
    color: '#17479E'
  },
  {
    id: 'pbks',
    name: 'Punjab Kings',
    shortName: 'PBKS',
    logo: 'https://scores.iplt20.com/ipl/teamlogos/PBKS.png',
    color: '#DD1F2D'
  },
  {
    id: 'rr',
    name: 'Rajasthan Royals',
    shortName: 'RR',
    logo: 'https://scores.iplt20.com/ipl/teamlogos/RR.png',
    color: '#254AA5'
  },
  {
    id: 'srh',
    name: 'Sunrisers Hyderabad',
    shortName: 'SRH',
    logo: 'https://scores.iplt20.com/ipl/teamlogos/SRH.png',
    color: '#FF822A'
  },
  {
    id: 'gt',
    name: 'Gujarat Titans',
    shortName: 'GT',
    logo: 'https://scores.iplt20.com/ipl/teamlogos/GT.png',
    color: '#1B2133'
  },
  {
    id: 'lsg',
    name: 'Lucknow Super Giants',
    shortName: 'LSG',
    logo: 'https://scores.iplt20.com/ipl/teamlogos/gPLvfvSC1X1711457972LSG.png',
    color: '#00A1E5'
  }
];

export const getTeamById = (id: string): Team | undefined => {
  return teams.find(team => team.id === id);
};