import { Canvas } from 'butterfly-dag';
import { BaseNode } from './node.js';

class RelationalSectionsCanvas extends Canvas {
  constructor(...args) {
    super(...args);
    const _this = this;

    this.on('InnerEvents', (data) => {
      if (data.type === 'node:removeEndpoint') {
        let edges = this.getNeighborEdges(data.data.nodeId);
        edges.forEach((item) => {
          item.redraw();
        });
      }
    });

    this.on('customCreateNode', function ({ name, parentSectionId }) {
      const canvas = this;
      const nodes = this.getDataMap().nodes;
      const mainNode = nodes[0];

      const node = {
        id: nodes.length.toString(),
        name: name,
        parentSectionId,
        top: window.innerHeight / 3 - mainNode.getHeight(),
        left: 500,
        generateChildData(name) {
          const nodes = canvas.getDataMap().nodes;
          let lastIdSection = 3 * (nodes.reduce((acc, cur) => {
            return cur.childData.length + acc
          }, 0));


          const id = lastIdSection;
          const sourceNodeId = ++lastIdSection;
          const targetNodeId = ++lastIdSection;
          return {
            id,
            sourceNodeId,
            targetNodeId,
            content: name,
          };

        },
        addSubNode(variant, id, subNode) {
          return args[0].addSubNode(variant, id, subNode);
        },
        editSubNode(variant, id, subNodeIndex, subNode) {
          return args[0].editSubNode(variant, id, subNodeIndex, subNode);
        },
        deleteSubNode(variant, id, subNodeId) {
          _this.removeNode(subNodeId);
          return args[0].deleteSubNode(variant, id, subNodeId);
        },
        deleteNode(variant, id, parentId) {
          _this.removeNode(id);
          console.log(_this.getDataMap())
          return args[0].deleteNode(variant, id, parentId);
        },
        onClickSecondSubNode(variant, id, subNodeId) {
          return args[0].onClickSecondSubNode(variant, id, subNodeId)
        },
        updateSubNodeC(index, value) {
          const subNode = _this.getNode(index + '');
          subNode.content = value;
        },
        data: {
          content: [
          ],
        },
        Class: BaseNode

      };

      _this.addNode(node);
      args[0].addNode('second', node);
      // setTimeout(() => console.log(_this.getDataMap(), 10000));
    });
  }


}

export default RelationalSectionsCanvas;
