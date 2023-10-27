import {
  Anchor,
  Box,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Grid,
  Group,
  Checkbox,
  createStyles
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { At, Lock } from 'tabler-icons-react';
import { Fetch } from '../../services';
import { IApiError } from '../../types';

const useStyles = createStyles((theme) => ({
  hideOnMobile: {
    [theme.fn.smallerThan('lg')]: {
      display: 'none',
    },
  },
  increaseHeight: {
    [theme.fn.smallerThan('lg')]: {
      height: 700,
    },
  }
}));

function Login() {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [form, setForm] = React.useState({
    username: '',
    password: '',
  });

  const mutationLogin = useMutation(Fetch.postLogin, {
    onSuccess: () => {
      navigate('/');
    },
    onError: (err: IApiError) => {
      showNotification({
        color: 'red',
        message: err.message,
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    mutationLogin.mutate(form);
  };

  if (localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }

  return (
    <Container
      fluid
      h="100vh"
      w="100%"
      px={0}
      mx={0}
    >
      <Grid h="100%" m={0} p={0}>
        <Grid.Col m={0} p={0} xs={0} lg={7} sm={12}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              backgroundColor: '#7879F1'
            }}
            px={150}
            py={250}
            className={classes.hideOnMobile}
          >
            <Box sx={{ background: '#9091eb', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 50 }} h="100%" w="100%" >
              <Text color='white' weight={600} size={40} w={250}>
                Lorem ipsum dolor si amet
              </Text>
              <Text weight={600} size={36}>
                consectetur
              </Text>
              <Text w={300}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </Box>
          </Box>
        </Grid.Col>
        <Grid.Col m={0} p={0} lg={5} sm={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            h="97vh"
          >
            <Box w="100%">
              <Container maw={400} size="sm" className={classes.increaseHeight}>
                <Title
                  mb={5}
                  sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontSize: 24,
                    fontWeight: 900,
                    lineHeight: 1.1,
                  })}
                >
                 Hello
                </Title>
                <Text mb={28} color="dimmed" size="md">
                  Enter your email and password to login.
                </Text>
                <Paper radius="md">
                  <form onSubmit={handleLogin}>
                    <TextInput
                      label="Email"
                      name="email"
                      placeholder="Masukan email anda"
                      icon={<At size="0.8rem" />}
                      required
                      onChange={handleChange}
                    />
                    <PasswordInput
                      label="Password"
                      name="password"
                      placeholder="Masukan pasword anda"
                      icon={<Lock size="0.8rem" />}
                      required
                      mt="xl"
                      onChange={handleChange}
                    />
                    <Group mt="xl" position="apart">
                      <Checkbox
                        label="Remember me"
                      />
                      <Anchor href="" target="_blank" color='black' underline size="sm">
                        Forgot password?
                      </Anchor>
                    </Group>
                    <Box mt="md">
                      <Grid>
                        <Grid.Col span={6}>
                          <Button
                            fullWidth
                            type="submit"
                            loading={mutationLogin.isLoading}
                          >
                            Login
                          </Button>
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <Button
                            fullWidth
                            variant="outline"
                          >
                            Sign Up
                          </Button>
                        </Grid.Col>
                      </Grid>
                    </Box>
                  </form>
                </Paper>
                <Text color="dimmed" size="sm" align='center' mt={45} >
                  Or, Login with 
                </Text>
                <Box mt={10}>
                  <Grid>
                    <Grid.Col span={4}>
                      <Button
                        fullWidth
                        variant="outline"
                      >
                        Facebook
                      </Button>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Button
                        fullWidth
                        variant="outline"
                      >
                        Linked in
                      </Button>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Button
                        fullWidth
                        variant="outline"
                      >
                        Google
                      </Button>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Container>
            </Box>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default Login;
