
/**
 * **************************************************
 *
 * @module App
 *
 * @description
 * App.tsx is the main React component for the App.
 * This is the starting point for the Weekly Prompts SPA.
 * Create new links for React Router here
 *
 * **************************************************
 */

import { useEffect } from 'react';
// ReactRouter v. 6.4
import {
  //Provide our base page
  Outlet,
  //Clarify which route we are on
  NavLink,
  //Use instead of external links, navigates in browser and stops reloading of the dom
  Link,
  //This allows us to update the UI without needing useState, onSubmit, and useEffect. Automatically syncs with data
  useLoaderData,
  //We use form because with client side apps, if we just link, it will change the request method
  Form,

  redirect,
  //Used to add global pending UI
  useNavigation,
  //To make the filtering happen on every keystroke
  useSubmit
} from 'react-router-dom';
//RR Tutorial information
import { getContacts, createContact } from './contacts'

//RR Tutorial information
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
};
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}


const App = () => {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  //* State
  //Doing this is the same as using a controlled component in React state, it's one point instead of three.
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  
  return (
    <>
      <div id="sidebar">
        <h1>Projects</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? 'loading' : ''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(e) => {
                //to prevent every letter from appearing in the browser history stack
                const isFirstSearch = q == null;
                submit(e.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">RRT: New</button>
          </Form>
        </div>
        <nav>
          {/* To create a simple new link on the router, put in a li in the following ul */}
          <ul>
            <li>
              <Link to={`/open1`}>Open 1</Link>
            </li>
            <li>
              <Link to={`/open2`}>Open 2</Link>
            </li>
            <li>
              <Link to={`/open3`}>Open 3</Link>
            </li>
            <li>
              <Link to={`/open4`}>Open 4</Link>
            </li>
            {/* The following is a function that will map out the contacts*/}
          </ul>
          {/* Ternary for rendering contacts or default message */}
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    //this is how we pass the information along
                    className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
                  >
                    <Link to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          RRT: {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>RRT: No Name</i>
                      )}{' '}
                      {contact.favorite && <span>★</span>}
                    </Link>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>RRT: No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
    </>
  );
}

export default App;



//! Class App Component !//
// const mapStateToProps = (store) => ({
// });
// const mapDispatchToProps = (dispatch) => ({
// });
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }
//   // Initialize all current curriculum and YAML content on mount.
//   componentDidMount() {
//   }
//   componentDidUpdate(prevProps) {
//   }
//   render() {
//     return (
//       <div>
//         <StarRating />
//         <Widget />
//         {/* < HelloWorld / > */}
//       </div>
//     );
//   }
// }
// {/* export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App)); */}
// export default App;