import { Box, Icon, Link, Stack, Text } from '@chakra-ui/react';
import { VscGithubInverted } from 'react-icons/vsc';
import React from 'react';

export const Footer = (): JSX.Element => {
	const links = [
		{
			label: 'Github',
			icon: VscGithubInverted,
			url: 'https://github.com/jcserv/uofthacks/'
		}
	];
	return (
		<Box as="footer" mt={12} height="100%" textAlign="center" className="app">
			<Text fontSize="sm">
				Made with{' '}
				<span aria-label="heart" role="img">
					&#128153;
				</span>{' '}
				by{' '}
				<Link href="https://ca.linkedin.com/in/shahmeer-shahid" isExternal>
					Shahmeer Shahid
				</Link>
				,{' '}
				<Link href="https://www.linkedin.com/in/lazar-lolic-207779184/" isExternal>
					Lazar Lolic
				</Link>
				,{' '}
				<Link href="https://www.github.com/imphungky/" isExternal>
					Michael Phung
				</Link>
				, &{' '}
				<Link href="http://jarrodservilla.com" isExternal>
					Jarrod Servilla
				</Link>
			</Text>
			<Stack mt={4} direction="row" spacing="12px" justify="center" mb={10}>
				{links.map((link, index) => {
					return (
						<Link key={index} display="inline-block" href={link.url} aria-label={link.label} isExternal>
							<Icon as={link.icon} fontSize="xl" color="gray.400" />
						</Link>
					);
				})}
			</Stack>
		</Box>
	);
};
