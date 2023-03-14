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

    this.on('customCreateNode', function ({ name }) {
      const canvas = this;
      const nodes = this.getDataMap().nodes;
      const mainNode = nodes[0];

      const node = {
        id: nodes.length.toString(),
        name: name,
        top: window.innerHeight / 3 - mainNode.getHeight(),
        left: 500,
        generateChildData(name, parentNodeId) {
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
          return args[0].deleteSubNode(variant, id, subNodeId);
        },
        onClickSecondSubNode(variant, id, subNodeId) {
          return args[0].onClickSecondSubNode(variant, id, subNodeId)
        },
        data: {
          content: [
          ],
        },
        Class: BaseNode

      };

      _this.addNode(node);
      args[0].addNode('second', node);
      setTimeout(() => console.log(_this.getDataMap(), 5000));
    });
  }


}

export default RelationalSectionsCanvas;
