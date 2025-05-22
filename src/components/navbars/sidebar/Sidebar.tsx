import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ListGroup, Card, Image, Badge } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import { CustomToggle } from "./CustomToggle";
import { CustomToggleLevelTwo } from "./CustomToggleLevelTwo";
import SimpleBar from "simplebar-react";
import { DashboardMenu } from "routes/DashboardRoutes";
import { DashboardMenuProps } from "types";

interface SidebarProps {
  showMenu: boolean;
  toggleMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ showMenu, toggleMenu }) => {
  const location = useLocation();

  const generateLink = (item: any) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return (
      <Link
        to={item.link}
        className={`nav-link ${
          location.pathname === item.link ? "active" : ""
        }`}
        onClick={() => (isMobile ? toggleMenu() : showMenu)}
      >
        {item.name}
        {item.badge && (
          <Badge className="ms-1" bg={item.badgecolor || "primary"}>
            {item.badge}
          </Badge>
        )}
      </Link>
    );
  };

  return (
    <Fragment>
      <SimpleBar style={{ maxHeight: "100vh" }}>
        <div className="nav-scroller">
          <Link to="/" className="navbar-brand">
            <Image src="/images/brand/logo/logo.svg" alt="" />
          </Link>
        </div>

        <Accordion
          defaultActiveKey="0"
          as="ul"
          className="navbar-nav flex-column"
        >
          {DashboardMenu.filter(menu => menu.title !== "Free Download").map(
            function (menu: DashboardMenuProps, index: number) {
              if (menu.grouptitle) {
                return (
                  <Card bsPrefix="nav-item" key={menu.id}>
                    <div className="navbar-heading">{menu.title}</div>
                  </Card>
                );
              } else {
                if (menu.children) {
                  return (
                    <Fragment key={menu.id}>
                      <CustomToggle eventKey={menu.id} icon={menu.icon}>
                        {menu.title}
                        {menu.badge ? (
                          <Badge
                            className="ms-1"
                            bg={menu.badgecolor ? menu.badgecolor : "primary"}
                          >
                            {menu.badge}
                          </Badge>
                        ) : (
                          ""
                        )}
                      </CustomToggle>
                      <Accordion.Collapse
                        eventKey={menu.id}
                        as="li"
                        bsPrefix="nav-item"
                      >
                        <ListGroup
                          as="ul"
                          bsPrefix=""
                          className="nav flex-column"
                        >
                          {menu.children.map(function (
                            menuLevel1Item,
                            menuLevel1Index
                          ) {
                            const childKey = `${menu.id}-${menuLevel1Index}`;
                            if (menuLevel1Item.children) {
                              return (
                                <ListGroup.Item
                                  as="li"
                                  bsPrefix="nav-item"
                                  key={menuLevel1Item.id}
                                >
                                  <Accordion className="navbar-nav flex-column">
                                    <CustomToggleLevelTwo eventKey={childKey}>
                                      {menuLevel1Item.title}
                                      {menuLevel1Item.badge ? (
                                        <Badge
                                          className="ms-1"
                                          bg={
                                            menuLevel1Item.badgecolor ||
                                            "primary"
                                          }
                                        >
                                          {menuLevel1Item.badge}
                                        </Badge>
                                      ) : (
                                        ""
                                      )}
                                    </CustomToggleLevelTwo>
                                    <Accordion.Collapse
                                      eventKey={childKey}
                                      bsPrefix="nav-item"
                                    >
                                      <ListGroup
                                        as="ul"
                                        bsPrefix=""
                                        className="nav flex-column"
                                      >
                                        {menuLevel1Item.children.map(function (
                                          menuLevel2Item,
                                          menuLevel2Index
                                        ) {
                                          const childKey = `${menuLevel1Index}-${menuLevel2Index}`;
                                          if (menuLevel2Item.children) {
                                            return (
                                              <ListGroup.Item
                                                as="li"
                                                bsPrefix="nav-item"
                                                key={menuLevel2Index}
                                              >
                                                <Accordion className="navbar-nav flex-column">
                                                  <CustomToggleLevelTwo
                                                    eventKey={childKey}
                                                  >
                                                    {menuLevel2Item.title}
                                                    {menuLevel2Item.badge ? (
                                                      <Badge
                                                        className="ms-1"
                                                        bg={
                                                          menuLevel2Item.badgecolor ||
                                                          "primary"
                                                        }
                                                      >
                                                        {menuLevel2Item.badge}
                                                      </Badge>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </CustomToggleLevelTwo>
                                                  <Accordion.Collapse
                                                    eventKey={childKey}
                                                    bsPrefix="nav-item"
                                                  >
                                                    <ListGroup
                                                      as="ul"
                                                      bsPrefix=""
                                                      className="nav flex-column"
                                                    >
                                                      {menuLevel2Item.children.map(
                                                        function (
                                                          menuLevel3Item,
                                                          menuLevel3Index
                                                        ) {
                                                          return (
                                                            <ListGroup.Item
                                                              key={
                                                                menuLevel3Index
                                                              }
                                                              as="li"
                                                              bsPrefix="nav-item"
                                                            >
                                                              {generateLink(
                                                                menuLevel3Item
                                                              )}
                                                            </ListGroup.Item>
                                                          );
                                                        }
                                                      )}
                                                    </ListGroup>
                                                  </Accordion.Collapse>
                                                </Accordion>
                                              </ListGroup.Item>
                                            );
                                          } else {
                                            return (
                                              <ListGroup.Item
                                                key={menuLevel2Index}
                                                as="li"
                                                bsPrefix="nav-item"
                                              >
                                                {generateLink(menuLevel2Item)}
                                              </ListGroup.Item>
                                            );
                                          }
                                        })}
                                      </ListGroup>
                                    </Accordion.Collapse>
                                  </Accordion>
                                </ListGroup.Item>
                              );
                            } else {
                              return (
                                <ListGroup.Item
                                  as="li"
                                  bsPrefix="nav-item"
                                  key={menuLevel1Index}
                                >
                                  {generateLink(menuLevel1Item)}
                                </ListGroup.Item>
                              );
                            }
                          })}
                        </ListGroup>
                      </Accordion.Collapse>
                    </Fragment>
                  );
                } else {
                  return (
                    <Card bsPrefix="nav-item" key={index}>
                      <Link
                        to={menu.link ?? "#"}
                        className={`nav-link ${
                          location.pathname === menu.link ? "active" : ""
                        }`}
                      >
                        {typeof menu.icon === "string" ? (
                          <i className={`nav-icon fe fe-${menu.icon} me-2`}></i>
                        ) : (
                          menu.icon
                        )}
                        {menu.title}
                        {menu.badge ? (
                          <Badge
                            className="ms-1"
                            bg={
                              menu.badgecolor ? menu.badgecolor : "primary"
                            }
                          >
                            {menu.badge}
                          </Badge>
                        ) : (
                          ""
                        )}
                      </Link>
                    </Card>
                  );
                }
              }
            }
          )}
        </Accordion>
      </SimpleBar>
    </Fragment>
  );
};

export default Sidebar;
