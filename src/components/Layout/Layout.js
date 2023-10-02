import Loader from 'components/Loader/Loader';
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const Header = styled.nav`
  background-color: #333;
  color: white;
  padding: 32px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
`;

const StyledLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 24px;
  &.active {
    color: violet;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const Layout = () => {
  return (
    <>
      <Header>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="movies">Movie</StyledLink>
      </Header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
export default Layout;
