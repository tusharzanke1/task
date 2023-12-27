import React, { FC, useContext } from 'react'
import { useModal } from 'hooks'

import moment from 'moment'
import Typography from 'share-ui/components/typography/Typography'
import styled from 'styled-components'
import TypographySecondary from 'components/Typography/Secondary'

import { Navigate, useNavigate } from 'react-router-dom'
import IconButton from 'share-ui/components/IconButton/IconButton'
import {
  StyledDeleteIcon,
  StyledEditIcon,
  StyledEyeOpenIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import { useChatsService } from 'services/chat/useChatsService'
import { useDeleteChatService } from 'services/chat/useDeleteChatService'
import { ToastContext } from 'contexts'
import { AgentWithConfigs, Nullable } from 'types'

import { useAgentsService } from 'services/agent/useAgentsService'
import AudioPlayer from 'components/AudioPlayer'
import { StyledIconWrapper } from 'components/ChatCards/TeamChatCard'

type CellProps = {
  value: Nullable<string>
}

const DateRenderer: React.FC<CellProps> = ({ value }) => {
  let content = null

  if (value === null) {
    const currentTime = moment().fromNow()
    content = (
      <TypographySecondary
        value={currentTime}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
    )
  } else {
    const formattedDate = moment(value).format('MMM DD, YYYY')
    const formattedTime = moment(value).format('h:mm A')
    content = (
      <StyledDateWrapper>
        <TypographySecondary
          value={formattedDate}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
        />
        <TypographySecondary
          value={formattedTime}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
        />
      </StyledDateWrapper>
    )
  }

  return content
}

export const useColumn = () => {
  return [
    {
      Header: 'Name',
      accessor: 'name',
      width: 300,
      minWidth: 300,
     
    },

    // {
    //   Header: 'Team Name',
    //   accessor: 'team_name',
    //   minWidth: 342,
    //   width: 200,
    // },
    {
      Header: 'Agent Name',
      accessor: 'agent_name',
      width: 300,
      minWidth: 300,
      

      // minWidth: 342,
      Cell: (props: { row: { original: any } }) => {
        const { original: data } = props.row
        const navigate = useNavigate()
        const { openModal } = useModal()

        const { data: agentsData } = useAgentsService()

        const handleAgentEditClick = () => {
          const agentIdToEdit = data.agent_id

          const agentToEdit = agentsData.find(agent => agent.agent.id === agentIdToEdit)

          if (agentToEdit) {
            navigate(`/agents/${agentToEdit.agent.id}/edit-agent`)
          }
        }

        const handleViewClick = () => {
          const selectedAgent = agentsData.find(agentObj => agentObj.agent.id === data.agent_id)

          if (selectedAgent) {
            openModal({ name: 'agent-view-modal', data: { agent: selectedAgent } })
          }
        }

        return (
          <StyledAgentNameCell>
            <TypographySecondary
              value={data.agent_name}
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
            />
            <StyledAgentIconsWrapper>
              <IconButton
                onClick={() => handleAgentEditClick()}
                icon={() => <StyledEditIcon />}
                size={IconButton.sizes?.SMALL}
                kind={IconButton.kinds?.TERTIARY}
                ariaLabel='Edit'
                className='eye-icon'
              />

              <IconButton
                onClick={() => handleViewClick()}
                icon={() => (
                  <StyledIconWrapper>
                    <StyledEyeOpenIcon />
                  </StyledIconWrapper>
                )}
                size={IconButton.sizes?.SMALL}
                kind={IconButton.kinds?.TERTIARY}
                ariaLabel='View'
                className='search-icon'
              />
            </StyledAgentIconsWrapper>
          </StyledAgentNameCell>
        )
      },
    },
    {
      Header: 'Status',
      accessor: 'status',
      minWidth: 100,
      width: 100,
    },
    {
      Header: 'Sentiment',
      accessor: 'sentiment',
      minWidth: 100,
      width: 100,
    },
    {
      Header: 'Voice',
      accessor: 'sender_name',
      minWidth: 180,
      width: 180,
      Cell: (props: { row: { original: any } }) => {
        const { original: data } = props.row

        if (data.voice_url !== null) {
          const audioUrl = data.voice_url

          return <AudioPlayer audioUrl={audioUrl} />
        }

        return null
      },
    },

    // {
    //   Header: 'Schedule Name',
    //   accessor: 'schedule_name',
    //   minWidth: 343,
    //   width: 200,
    // },
    {
      Header: 'Created Date',
      accessor: 'added_at',
      minWidth: 200,
      width: 200,
      Cell: DateRenderer,
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      minWidth: 100,
      width: 100,
      maxWidth: 100,

      Cell: (props: { row: { original: any } }) => {
        const { original: data } = props.row
        const { refetch: refetchChat } = useChatsService({})

        const { deleteChat } = useDeleteChatService()
        const { openModal, closeModal } = useModal()
        const { setToast } = useContext(ToastContext)
        const deleteChatHandler = async (id: string) => {
          openModal({
            name: 'delete-confirmation-modal',
            data: {
              deleteItem: async () => {
                try {
                  await deleteChat(id)
                  await refetchChat()
                  // navigate('/chat');
                  setToast({
                    message: 'Chat was deleted!',
                    type: 'positive',
                    open: true,
                  })
                } catch (e) {
                  setToast({
                    message: 'Failed to delete Chat!',
                    type: 'negative',
                    open: true,
                  })
                }
                closeModal('delete-confirmation-modal')
              },
              label: 'Delete Session?',
            },
          })
        }

        const navigate = useNavigate()
        const handleViewClick = (id: string) => {
          navigate(`/sessions?chat=${id}`)
        }

        return (
          <StyledActionWrapper>
            <IconButton
              onClick={() => deleteChatHandler(data.id)}
              icon={() => <StyledDeleteIcon />}
              size={IconButton.sizes?.SMALL}
              kind={IconButton.kinds?.TERTIARY}
              ariaLabel='Delete'
            />

            <IconButton
              onClick={() => handleViewClick(data.id)}
              icon={() => (
                <StyledIconWrapper>
                  <StyledEyeOpenIcon />
                </StyledIconWrapper>
              )}
              size={IconButton.sizes?.SMALL}
              kind={IconButton.kinds?.TERTIARY}
              ariaLabel='View'
            />
          </StyledActionWrapper>
        )
      },
    },
  ]
}

const StyledActionWrapper = styled.div`
  display: flex;
  position: relative;
  bottom: 5px;
  justify-content: center;
  align-items: center;

  .components-IconButton-IconButton-module__iconButtonContainer--ttuRB {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
      border-radius: 50%;
    }
  }
`

const StyledAgentNameCell = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 5px;

  .components-IconButton-IconButton-module__iconButtonContainer--ttuRB {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
      border-radius: 50%;
    }
  }
`
const StyledAgentIconsWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  bottom: 11px;
  margin-left: auto;
  opacity: 0;

  ${StyledAgentNameCell}:hover & {
    opacity: 1;
  }

  .edit-icon,
  .search-icon {
    margin-left: 10px;
  }
`

const StyledDateWrapper = styled.div`
  display: flex;
  position: relative;
  top: 5px;
  align-items: center;
  gap: 12px;
`
