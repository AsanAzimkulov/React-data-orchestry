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

    this.on('customCreateNode', function ({ name, parentSectionId, cords, reactive }) {
      const canvas = this;
      const nodes = this.getDataMap().nodes;
      const mainNode = nodes[0];

      const id = nodes.length === 0 ? 1 : (nodes.length + 1);
      console.log(id)
      const node = {
        id: reactive ? (id - 1).toString() : id.toString(),
        name: name,
        parentSectionId,
        top: cords.y || 221,
        left: cords.x || 93,
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
        addSubNode(variant, id, subnode) {
          return args[0].addSubNode(variant, id, subnode);
        },
        editSubNode(variant, id, subnodeIndex, subnode) {
          return args[0].editSubNode(variant, id, subnodeIndex, subnode);
        },
        deleteSubNode(variant, id, subnodeId) {
          _this.removeNode(subnodeId);
          return args[0].deleteSubNode(variant, id, subnodeId);
        },
        deleteNode(variant, id, parentId) {
          _this.removeNode(id);
          console.log(_this.getDataMap())
          return args[0].deleteNode(variant, id, parentId);
        },
        onClickSecondSubNode(variant, id, subnodeId) {
          return args[0].onClickSecondSubNode(variant, id, subnodeId)
        },
        updateSubNodeC(index, value) {
          const subnode = _this.getNode(index + '');
          subnode.content = value;
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

    this.on('setActiveSection', function (sectionId) {
      // window.myCanv.subnodes.forEach(subnode => {

      //   // console.log(document.querySelectorAll('.flow-canvas .section')[subnode.id]);

      //   if (subnode.parentSectionId == sectionId) {
      //     Array.from(document.querySelectorAll('.flow-canvas .section'))[subnode.id].style.display = 'block';
      //   } else {
      //     Array.from(document.querySelectorAll('.flow-canvas .section'))[subnode.id].style.display = 'none';
      //   }
      // })

      Array.from(document.querySelectorAll('.section')).forEach(node => {
        if (node.getAttribute('parentSectionId') == sectionId) {
          node.style.display = 'block';
        } else {
          node.style.display = 'none';
        }
      });
    });
  }


}

export default RelationalSectionsCanvas;
