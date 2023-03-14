import { Endpoint } from 'butterfly-dag';

class CustomEndpoint extends Endpoint {

  /**
    * Callback after anchor is mounted
    */
  mount() { }

  /**
    */
  draw(obj) { }

  /**
    * When dragging the anchor point, set the linkable state callback when the connection is connected, and the linkable style can be defined
    * (You need to set this.theme.endpoint.linkableHighlight property to trigger this callback)
    */
  linkable() { }

  /**
    * The linkable state callback when the mouse is released to cancel the connection, and the cancel line style can be defined to be cleared
    * (Used in conjunction with linkable)
    */
  unLinkable() { }

  /**
    * When dragging the anchor point, set the linkable when connecting and hover to this anchor point. The state callback can define the hover state style of the linkable. 
    * (Used in conjunction with linkable)
    */
  hoverLinkable() { }

  /**
    * When the mouse is released to cancel the connection, the linkable and hover state are called back, and the style of the hover state of the linkable line segment can be defined clearly
    * (Used in conjunction with hoverLinkable)
    */
  unHoverLinkable() { }
}