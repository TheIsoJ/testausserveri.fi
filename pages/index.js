import Head from 'next/head'
import FadeIn from 'react-fade-in';
import styled from 'styled-components'
import { ButtonIcon, CapsuleButton } from '../components/Button/CapsuleButton';
import DiscordIcon from '../assets/DiscordIcon.svg'

import { DiscordLive } from '../components/DiscordLive/DiscordLive'
import { GradientTitle } from '../components/Title/GradientTitle';
import { StatGroup } from '../components/Stat/StatGroup';
import { Content } from '../components/Content/Content';
import { getGuildInfo, useGuildInfo } from '../hooks/useGuildInfo';
import { useEffect, useState } from 'react';

const Hero = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -1.5rem;
  position: relative;
  overflow: hidden;
  margin-bottom: -22rem;
  @media only screen and (max-width: 670px) {
    margin-bottom: -30rem;
  }
  &:after {
    content: ' ';
    width: 100%;
    bottom: 0;
    position: absolute;
    left: 0;
    height: 100%;
    z-index: 1;
    background: linear-gradient(180deg, rgba(13, 13, 13, 0) 0%, #0D0D0D 66.67%, #0D0D0D 96.87%);
    @media only screen and (max-width: 670px) {
      background: linear-gradient(180deg, rgba(13, 13, 13, 0) 0%, #0D0D0D 50%, #0D0D0D 96.87%);

    }
  }
`
const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  z-index: 1;
  position: relative;
  flex-direction: column;
  margin-bottom: 2.5rem;
`

export default function Home({ssGuildInfo}) {
  const guildInfo = useGuildInfo(ssGuildInfo)
  const [stats, setStats] = useState([])

  useEffect(() => {
    setStats([
      {
        "label": "Jäseniä",
        "value": guildInfo?.memberCount
      },
      {
        "label": "Paikalla nyt",
        "value": guildInfo?.membersOnline
      },
      {
        "label": "Viestejä tänään",
        "value": guildInfo?.messagesToday
      },
      {
        "label": "Projekteja",
        "value": 40
      }
    ])
  }, [guildInfo])

  return (
    <div>
      <Head>
          <title>Testausserveri</title>
      </Head>
      <Hero>
        <FadeIn>
          <DiscordLive />
        </FadeIn>
      </Hero>
      <Center>
        <GradientTitle>
          Nettiyhteisö<br />
          nuorille hakkereille
        </GradientTitle>
        <a href="https://discord.testausserveri.fi">
          <CapsuleButton style={{marginTop: "0.5rem"}}>
              <ButtonIcon src={DiscordIcon} />
            Tule juttelemaan!
          </CapsuleButton>
        </a>
      </Center>
      <Content>
        <StatGroup stats={stats} />
      </Content>
    </div>
  )
}

export async function getServerSideProps() {
  const guildInfo = await getGuildInfo()

  return { props: { ssGuildInfo: guildInfo } }
}
