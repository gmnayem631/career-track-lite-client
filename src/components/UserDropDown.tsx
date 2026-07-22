import { Dropdown, Button, Label } from "@heroui/react";

const UserDropDown = () => {
  const handleSignOut = () => {
    console.log("sign out");
  };
  return (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item id="new-file" textValue="New file">
            <Label>Dashboard</Label>
          </Dropdown.Item>
          <Dropdown.Item id="copy-link" textValue="Copy link">
            <Label>All Applications</Label>
          </Dropdown.Item>
          <Dropdown.Item id="edit-file" textValue="Edit file">
            <Label>Edit Applications</Label>
          </Dropdown.Item>
          <Dropdown.Item id="delete-file" textValue="Sign Out" variant="danger">
            <Label onClick={handleSignOut}>Sign Out</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default UserDropDown;
