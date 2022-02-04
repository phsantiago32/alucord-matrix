import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { UserContext } from '../context/user-context';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0Mzk5NTk2NCwiZXhwIjoxOTU5NTcxOTY0fQ.Y9rFA6xyd4nNRWxxAgi6vmKqa6lHhk--94Enidga0WQ'
const SUPABASE_URL = 'https://bivcnkxesbramxrcrfqi.supabase.co'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    // Sua lógica vai aqui
    const [message, setMensagem] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);

    const user = React.useContext(UserContext);

    React.useEffect(() => {
        supabase
            .from('messages')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setMessageList(data);
            })
    }, []);


    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList
                        messages={messageList}
                        deleteHandler={deleteMessage}
                    />

                    {/* <MessageListOld messages={messageList} /> */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(e) => {
                                if (e.key === 'Enter') {
                                    return
                                }
                                setMensagem(e.target.value);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleNewMessage(message);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            onClick={() => {
                                handleNewMessage(message);
                            }}
                            label='Enviar'
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            styleSheet={{
                                marginBottom: '10px',
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )

    function handleNewMessage(message) {

        const messageObj = {
            username: user.userName,
            name: user.name,
            text: message,
        }

        console.log(messageObj);

        supabase.from('messages').insert(messageObj).then(({ data }) => {
            setMessageList([data[0], ...messageList]);
        })

        setMensagem('');
    }

    function deleteMessage(id) {
        supabase.from('messages').delete().eq('id', id).then(({ data }) => {
            setMessageList(messageList.filter(message => message.id !== id))
        })
    }
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    let messages = props.messages;
    const user = React.useContext(UserContext);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {messages.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            {/* Message metadata */}
                            <Box
                                styleSheet={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginBottom: '5px',
                                }}
                            >
                                <Image
                                    styleSheet={{
                                        width: '25px',
                                        height: '25px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/${message.username}.png`}
                                />
                                <Text tag="strong">
                                    {message.name} ({message.username})
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        // marginTop: '12px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                            </Box>

                            <Box
                                styleSheet={{
                                    display: 'flex',
                                    flexDirection: 'row-reverse',
                                    justifyContent: 'space-between',
                                }}>
                                <Image
                                    onClick={() => {
                                        props.deleteHandler(message.id);
                                    }}
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer',
                                        marginRight: '8px',
                                    }}
                                    src={'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-coloricon-1/21/52-512.png'}
                                />
                                <Text
                                    styleSheet={{
                                        marginTop: '8px',
                                    }}>
                                    {message.text}
                                </Text>
                            </Box>
                        </Box>
                    </Text>
                )
            })}
        </Box>
    )
}

function MessageListOld(props) {
    console.log(props);
    return (
        <Box
            tag="div"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.messages.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="div"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.from}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.text}
                    </Text>
                );
            })}
        </Box>
    )
}