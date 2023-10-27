import { Group, Loader, Text } from '@mantine/core';

function Loading({ sx }: any) {
  return (
    <Group position="center" sx={sx}>
      <Loader size="sm" />
      <Text>Loading ...</Text>
    </Group>
  );
}

export default Loading;
