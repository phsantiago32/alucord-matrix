import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import appConfig from "../config.json"
import { useRouter } from 'next/router';

function Titulo(props) {
  console.log(props)
  const Tag = props.tag
  return (
    <div>
      <Tag>{props.children}</Tag>
      <style jsx>{`
      ${Tag} {
        color: ${appConfig.theme.colors.neutrals['000']};
        font-size: 24px;
        font-weight: 600:
      }
    `}</style>
    </div>
  )
}

export default function PaginaInicial() {
  const [userName, setUsername] = React.useState('');
  const router = useRouter();
  const [name, setName] = React.useState('');
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            onSubmit={function (event) {
              event.preventDefault()
              router.push('/chat')
            }}
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Bem vindo!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              onChange={async function (event) {
                const value = event.target.value
                setUsername(value)
                const response = await fetch(`https://api.github.com/users/${value}`)
                const json = await response.json()
                console.log(json)
                setName(json.name)
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}
          {/* Photo Area */}
          <UserAvatar
            userName={userName}
            name={name}
          />
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}

function UserAvatar(props) {
  const userName = props.userName;
  const name = props.name;
  console.log({name})
  if (userName.length >= 2) {
    return <Box
      styleSheet={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '200px',
        padding: '16px',
        backgroundColor: appConfig.theme.colors.neutrals[800],
        border: '1px solid',
        borderColor: appConfig.theme.colors.neutrals[999],
        borderRadius: '10px',
        flex: 1,
        minHeight: '240px',
      }}
    >
      <Image
        styleSheet={{
          borderRadius: '50%',
          marginBottom: '16px',
        }}
        src={`https://github.com/${userName}.png`} />
      <Text
        variant="body4"
        styleSheet={{
          color: appConfig.theme.colors.neutrals[200],
          backgroundColor: appConfig.theme.colors.neutrals[900],
          padding: '3px 10px',
          borderRadius: '1000px'
        }}
      >
        {name}
      </Text>
    </Box>;
  }
  return <></>
}
