export default function Game() {
   return (
      <article className="prose">
         <h3 id="game-components">Game Components</h3>
         <ol>
            <li>
               <p>
                  <strong>Game Board</strong>:
               </p>
               <ul>
                  <li>
                     A rectangular board, longer than it is wide. A suggested dimension could be similar to a checkers
                     board but elongated, such as 12x8 squares.
                  </li>
                  <li>
                     Each short end (where players sit) includes a compartment for five feystones (possibly represented
                     by gem-like tokens or marbles).
                  </li>
               </ul>
            </li>
            <li>
               <p>
                  <strong>Pieces</strong>:
               </p>
               <ul>
                  <li>
                     Each player has 10 to 15 pieces (depending on the number of feystones activated), including one
                     mandatory Treasure piece. The types of pieces are Bow, Sword, Spear (Lancer), Scholar, Support, and
                     Treasure.
                  </li>
                  <li>
                     Pieces could be made from resin or wood, with customization options for color to reflect personal
                     tastes (e.g., eye color, birth season).
                  </li>
               </ul>
            </li>
            <li>
               <p>
                  <strong>Feystones</strong>:
               </p>
               <ul>
                  <li>
                     Five gem-like tokens used to determine the number of pieces a player can move per turn, influencing
                     game complexity and strategy.
                  </li>
               </ul>
            </li>
         </ol>
         <h3 id="setup">Setup</h3>
         <ol>
            <li>
               <p>
                  <strong>Pre-Match Checks</strong>:
               </p>
               <ul>
                  <li>
                     Players exchange their sets of pieces to ensure there are no &quot;residual mana&quot; effects,
                     ensuring fairness.
                  </li>
                  <li>
                     Players then place and charge their chosen number of feystones in the board compartment, agreeing
                     on the game&#39;s difficulty level (one to five stones).
                  </li>
               </ul>
            </li>
            <li>
               <p>
                  <strong>Piece Placement</strong>:
               </p>
               <ul>
                  <li>
                     Players set up their pieces on their respective sides of the board. The exact starting positions
                     can be standardized or left flexible as part of the strategy.
                  </li>
               </ul>
            </li>
         </ol>
         <h3 id="game-play">Game Play</h3>
         <ol>
            <li>
               <p>
                  <strong>Objective</strong>:
               </p>
               <ul>
                  <li>The main goal is to capture the opponent&#39;s Treasure piece.</li>
               </ul>
            </li>
            <li>
               <p>
                  <strong>Movement</strong>:
               </p>
               <ul>
                  <li>
                     Depending on the number of feystones activated, players can move a corresponding number of pieces
                     per turn. For example, in a one-stone game, each player might move one piece per turn, while in a
                     five-stone game, five movements are allowed.
                  </li>
               </ul>
            </li>
            <li>
               <p>
                  <strong>Turns</strong>:
               </p>
               <ul>
                  <li>
                     Players determine who moves first by the &quot;scholar and support&quot; choice game described.
                  </li>
                  <li>
                     Movement is done turn by turn, with each player moving the allowed number of pieces based on the
                     feystones.
                  </li>
               </ul>
            </li>
            <li>
               <p>
                  <strong>Piece Abilities</strong>:
               </p>
               <ul>
                  <li>
                     Each type of piece (Bow, Sword, Spear, etc.) could have specific movement patterns or abilities,
                     akin to chess. For example, Swords might move one square in any direction, Spears might move up to
                     three squares straight, and Bows could attack from a distance.
                  </li>
               </ul>
            </li>
            <li>
               <p>
                  <strong>Mana</strong>:
               </p>
               <ul>
                  <li>
                     While actual &quot;mana&quot; cannot be used, this could be represented by action points or a
                     similar conceptual mechanic that limits or enhances movement or abilities.
                  </li>
               </ul>
            </li>
         </ol>
         <h3 id="special-rules-for-one-stone-game">Special Rules for One-Stone Game</h3>
         <ul>
            <li>Limit to 10 pieces per player, excluding Scholar and Support pieces.</li>
            <li>No modifications to pieces are allowed; straightforward abilities only.</li>
            <li>Players may only use Sword, Spear, and Bow pieces.</li>
         </ul>
         <h3 id="modifications-and-customizations">Modifications and Customizations</h3>
         <ul>
            <li>
               Players could be allowed to customize their pieces&#39; abilities or characteristics as part of pre-game
               setup in more advanced settings, using additional &quot;mana points&quot; or similar resources.
            </li>
         </ul>
         <h3 id="conclusion">Conclusion</h3>
         <p>
            This framework provides a structured approach to creating a Gewinnen board game, balancing between fantasy
            elements and practical gameplay mechanics. The game could be further developed with precise movement rules
            for each piece type and additional strategic elements to enhance the playing experience.
         </p>
      </article>
   );
}
